# Formulario 47 - Tegra RJ  
  
HTML:  
  
<form style=" border: 1px solid rgb(226, 226, 226); width: 100%; margin: 0 auto; padding: 20px;"><li class="text-field form-field" type="text"><label class="field-label" for="nome-field">Nome</label><span class="required-asterisk" style="display: none;"> *</span><div class="prev-holder" style=""><div class="fb-text form-group field-nome-preview"><input type="text" autocomplete="name" placeholder="Seu nome" class="form-control" name="nome" mascara="form-control" id="nome-field"></div></div></li><li class="text-field form-field" type="email"><label class="field-label" for="email-field">E-mail</label><span class="required-asterisk" style="display: none;"> *</span><div class="prev-holder" style=""><div class="fb-text form-group field-email-preview"><input type="email" autocomplete="email" class="form-control" name="email" placeholder="Deixe seu e-mail" mascara="form-control" id="email-field"></div></div></li><li class="text-field form-field" type="tel"><label class="field-label" for="telefone-field">Telefone</label><span class="required-asterisk" style="display: none;"> *</span><div class="prev-holder" style=""><div class="fb-text form-group field-telefone-preview"><input type="tel" autocomplete="tel" placeholder="Deixe seu telefone" class="form-control" name="telefone" mascara="telefone form-control" id="telefone-field"></div></div></li><li class="text-field form-field" type="text" id="frmb-4436432856821-fld"><label class="field-label">Empreendimento</label><span class="required-asterisk" style="display: none;"> *</span><div class="prev-holder"><div class="fb-text form-group field-text-1672691403688-preview"><input  type="text" placeholder="" class="form-control" name="texto-livre-preview" mascara="form-control" id="text-1672691403688-preview"></div></div></li><input type="hidden" id="tenant_id" value="313"> <input type="hidden" id="form_id" value="47"> <p data-log="infoLog" style="font-size: 14px; padding: 0; display: none;">Por favor, preencha os campos corretamente</p>  
<button onclick="send()" type="button" name="Cadastre-se" data-action="submit" style="height: 45px; width: 100%; border: none; text-transform: none; letter-spacing: 0.2px; font-size: 14px; background-color: rgb(0, 0, 0); color: rgb(255, 255, 255); border-radius: 10px; padding: 10px 0px; font-weight: 600; margin: 8px 0px; box-shadow: none; display: flex; align-items: center; justify-content: center;"><span data-v-c89a95f8="" class="material-icons" style="font-size: 25px; color: rgb(255, 255, 255); margin-right: 5px; display: none;"></span>  
      Cadastre-se  
    </button></form>  
  
  
Script:  
  
  
       
    
      <link rel="stylesheet" href="https://adm.gdigital.com.br/css/form.css">  
      <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>  
      <script>  
      let formsInputs = document.querySelectorAll("form input");  
      for (let i = 0; i < formsInputs.length; i++) {  
        const element = formsInputs[i];   
        const mask = element.getAttribute('mascara');    
        if (mask && mask.includes('cpf')) {  
          element.addEventListener('input', function(e) {  
            let value = e.target.value.replace(/D/g, '');        
            if (value.length > 14) {  
              value = value.slice(0, 14);  
            }  
            if (value.length <= 11) {           
              value = value.replace(/(d{3})(d)/, "$1.$2");  
              value = value.replace(/(d{3})(d)/, "$1.$2");  
              value = value.replace(/(d{3})(d{1,2})$/, "$1-$2");  
            } else {             
              value = value.replace(/^(d{2})(d)/, "$1.$2");  
              value = value.replace(/^(d{2}).(d{3})(d)/, "$1.$2.$3");  
              value = value.replace(/.(d{3})(d)/, ".$1/$2");  
              value = value.replace(/(d{4})(d{1,2})$/, "$1-$2");  
            }  
            e.target.value = value;  
          });  
        }  
        if (element.type === 'text' && element.name.includes('phone')) {  
          function formatPhoneNumber(value) {  
            let isInternational = false;          
            if (value.startsWith('+')) {  
                isInternational = true;  
                value = '+' + value.slice(1).replace(/\D/g, '');   
            } else {  
                value = value.replace(/\D/g, '');   
            }  
            if (value.length === 0) {  
                return '';   
            }   
            if (isInternational || value.length > 11) {        
                return isInternational ? `${value.slice(0, 20)}` : value.slice(0, 20);   
            }           
            document.querySelector('[data-log="infoLog"]').innerText = "";  
            if (value.length <= 2) {  
                return `${value}`;   
            }   
            if (value.length <= 6) {  
                return `(${value.slice(0, 2)}) ${value.slice(2)}`;   
            }   
            if (value.length <= 10) {  
                return `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;  
            }  
            if (value.length <= 11) {  
                return `(${value.slice(0, 2)}) ${value.slice(2, 3)} ${value.slice(3, 7)}-${value.slice(7)}`;  
            }  
          }     
          element.addEventListener('input', function (e) {  
            e.target.value = formatPhoneNumber(e.target.value);  
          });  
        }    
      }  
      function send() {  
      let formData = new FormData();  
      let formsInputs = document.querySelectorAll("form input");  
      let textsarea = document.querySelectorAll("form textarea");  
      let selects = document.querySelectorAll("form select");  
      let form = document.querySelector("form");  
      let checked = false;  
      let checkbox_required = false;  
      formData.append("tenant_id", document.querySelector("#tenant_id").value);  
      formData.append("form_id", document.querySelector("#form_id").value);  
      for (let i = 0; i < formsInputs.length; i++) {  
        const element = formsInputs[i];  
        let name_field = element.name.replace("-preview", "");  
        if (  
          element.type !== "radio" &&  
          element.type !== "checkbox" &&  
          element.type !== "file") {  
          formData.append(name_field, element.value);   
        }  
        document.querySelector('[data-log="infoLog"]').style.display = "none";     
        const value = element.value.replace(/D/g, '');   
        const mask = element.getAttribute('mascara');  
        if (mask && mask.includes('cpf') && (value.length !== 11 && value.length !== 14)) {  
          const infoLog = document.querySelector('[data-log="infoLog"]');  
          infoLog.style.color = "red";  
          infoLog.style.display = "block";  
          infoLog.innerText = "Por favor, insira um CPF/CNPJ válido";          
          return;  
        }   
        if (element.type === "text" && element.name.includes('email')) {  
          const emailValue = element.value;  
            const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;  
          if (!emailRegex.test(emailValue)) {         
            const infoLog = document.querySelector('[data-log="infoLog"]');  
            infoLog.style.color = "red";  
            infoLog.style.display = "block";  
            infoLog.innerText = "Por favor, insira um e-mail válido";  
            return;   
          }  
        }    
        if (element.ariaRequired && element.value === "") {  
          document.querySelector('[data-log="infoLog"]').style.color = "red";  
          document.querySelector('[data-log="infoLog"]').style.display = "block";  
          return;  
        }  
        checkbox_required =  
          element.type === "checkbox" && element.ariaRequired ? true : false;  
  
        if (  
          (element.type === "radio" && element.checked) ||  
          (element.type === "checkbox" && element.checked)  
        ) {  
          checked = element.type === "checkbox" ? true : false;  
          formData.append(name_field, element.value);  
        }  
      }  
      if (!checked && checkbox_required) {  
        document.querySelector('[data-log="infoLog"]').style.color = "red";  
        document.querySelector('[data-log="infoLog"]').style.display = "block";  
        return;  
      }  
      document.querySelector('[data-log="infoLog"]').style.display = "none";  
      for (let i = 0; i < textsarea.length; i++) {  
        const element = textsarea[i];  
        let name_field = element.name.replace("-preview", "");  
        formData.append(name_field, element.value);  
        document.querySelector('[data-log="infoLog"]').style.display = "none";  
        if (element.ariaRequired && element.value === "") {  
          document.querySelector('[data-log="infoLog"]').style.color = "red";  
          document.querySelector('[data-log="infoLog"]').style.display = "block";  
          return;  
        }  
      }  
      for (let i = 0; i < selects.length; i++) {  
        const element = selects[i];  
        let name_field = element.name.replace("-preview", "");  
        formData.append(name_field, element.value);  
        document.querySelector('[data-log="infoLog"]').style.display = "none";  
        if (element.ariaRequired && element.value === "") {  
          document.querySelector('[data-log="infoLog"]').style.color = "red";  
          document.querySelector('[data-log="infoLog"]').style.display = "block";  
          return;  
        }  
      }  
      const inputFiles = document.querySelectorAll('input[type="file"]');  
      inputFiles.forEach((file) => {  
        if (file && file.files[0]) {  
          formData.append(file.name.replace("-preview", ""), file.files[0]);  
        }  
      });  
      axios  
        .post("https://back.gdigital.com.br/" + "form/register", formData)  
        .then((resp) => {  
          const query_params = resp.data && resp.data.query_params ? resp.data.query_params : '';  
            let url = "/"+query_params;  
          let canRedirect=false  
          if(canRedirect){  
            window.location.href = url;  
          }  
          document.querySelector('[data-log="infoLog"]').style.color = "green";  
          document.querySelector('[data-log="infoLog"]').style.display = "block";  
          document.querySelector('[data-log="infoLog"]').innerText = "Lead cadastrado com sucesso";  
        })  
        .catch((error) => {  
          document.querySelector('[data-log="infoLog"]').style.color = "red";  
          document.querySelector('[data-log="infoLog"]').style.display = "block";  
          document.querySelector('[data-log="infoLog"]').innerText = "Por favor, preencha os campos corretamente";  
        });  
      }   
      </script>  
        
        
