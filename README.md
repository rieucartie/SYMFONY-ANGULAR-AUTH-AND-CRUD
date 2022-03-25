*** symfony angular ***
*******************
### Configuration

symfony 6 <br/>
php 8 <br/>

http://localhost:8000/api

### partie Api-platform

+ composer update 
+ php bin/console d:d:c
+ php bin/console make:migration 
+ php bin/console doctrine:migrations:migrate 
+ php bin/console doctrine:fixtures:load

--- Utiliser **lexik/jwt-authentication-bundle** et **postman**

+ php bin/console lexik:jwt:generate-keypair
  
+ une fois les cles regénérées recuperer le token sur postman ou autres
avec http://localhost:8000/api/login_check et http://localhost:8000/api/articles avec autorisation bearer et le token qu'on a reçu précédemment

### partie angular
<ol>
  <li>npm install</li>
  <li>ng serve ou npm run start</li>
</ol>

http://localhost:4200/login


