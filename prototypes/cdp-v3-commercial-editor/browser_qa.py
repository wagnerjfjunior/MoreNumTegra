# Browser QA for the isolated CDP V3 prototype.
# Requires: python -m pip install playwright; chromium installed.
# Run from repository root: python prototypes/cdp-v3-commercial-editor/browser_qa.py
# Does not publish or mutate commercial state.
import json
from pathlib import Path
from playwright.sync_api import sync_playwright

root = Path(__file__).resolve().parent
with sync_playwright() as pw:
    browser = pw.chromium.launch(headless=True)
    for width, height in ((390, 844), (1280, 800)):
        page = browser.new_page(viewport={"width": width, "height": height}, accept_downloads=True)
        errors = []
        page.on("pageerror", lambda error: errors.append(str(error)))
        page.goto((root / "index.html").as_uri())
        page.wait_for_function("document.querySelector('#computed').textContent.includes('21.750.000')")
        assert "43.500" in page.locator("#perSqm").inner_text()
        assert page.locator("#export").is_disabled()
        page.locator("#source").fill("QA fonte demonstrativa")
        page.locator("#reason").fill("Teste de exportacao, nao autorizado para publicar")
        page.locator("#reviewed").check()
        assert page.locator("#export").is_enabled()
        with page.expect_download() as info:
            page.locator("#export").click()
        download = info.value
        output = root / ("qa-export-" + str(width) + ".json")
        download.save_as(output)
        payload = json.loads(output.read_text(encoding="utf-8"))
        output.unlink()
        assert payload["price"] == 21750000
        assert payload["pricePerSqm"] == 43500
        assert payload["publicationAuthorized"] is False
        page.locator("#vpl").check()
        assert not page.locator("#direct").is_checked()
        assert page.locator("#vplFields").is_visible()
        assert "21.750.000" in page.locator("#computed").inner_text()
        page.locator("#percent").fill("101")
        assert page.locator("#export").is_disabled()
        page.locator("#percent").fill("13")
        assert page.locator("#export").is_enabled()
        assert page.evaluate("document.documentElement.scrollWidth <= innerWidth")
        assert not errors, errors
        print("PASS", width, "direct / VPL / JSON / validation / layout / JS")
        page.close()
    browser.close()
