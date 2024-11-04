# POINTS : 10
# Github
https://github.com/dominhquan2003/PointofSale.git
# Link Product deployment
http://hocnodecungcapasa.fun 
# DEMO 
Link demo :  https://youtu.be/r8ntvqSErPA

# INSTRUCTION 

`1.Install Node.js and npm: `
   Firstly, install Node.js and npm (Node Package Manager). You can download the installer from the official Node.js website: https://nodejs.org/

`2.Open Terminal or Command Prompt:`
   •	Open source code in Visual Studio Code 
   •	Clicking` Terminal` on navbar and click `New terminal`
   •	In terminal interface,using `ls` command to list all the files and folders in the current directory. Ensure that you see source code files and folders listed
   •	`npm install` to install dependencies 

`3.Set up Mysql database:`
   Ensure that you Ensure that you have MySQL and Xampp installed on your machine and you need to config information in file `.env`.
   Your just need to change 3 row to be suitable for your Mysql information. If you donot change anything, my setting up is default

      DATABASE_USERNAME="root"
      DATABASE_PASSWORD=''
      DATABASE_PORT="3306"

`4.Insert database:` Opening xampp start server Apache and MYSQL you will click button `Admin` in the same row with MYSQL to access to phpMyAdmin. Having 2 ways to insert data
      •	Click into `SQL` on navbar of phpMyAdmin and copy code in `pos.sql` to paste into it. Click button `GO` to insert.
      •	Click `Import` on navebar and choose file `pos.sql` in source code and click `import` to insert
`5.Run the application:` npm start
`6.Account` : when access to the system, the examiner can use 2 accounts to test  
      •	Admin account: username: admin, password: admin 
      •	User account: username: doquan23032003, password: 123123 or login with role admin and create user. 




