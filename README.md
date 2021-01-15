## Docker MySQL Setup

docker run -p3307:3006 --name my-mysql -e MYSQL_ROOT_PASSWORD=root -d mysql:latest
> 2013d0869b9cc001d746671cd244c01904d9144b05f0413e34e8b233bd2f4a4c

docker ps -a
> CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                          PORTS                 NAMES
> 2013d0869b9c        mysql:latest        "docker-entrypoint.s…"   27 seconds ago      Up 25 seconds                   3306/tcp, 33060/tcp   mysql

docker exec -it my-mysql /bin/bash
mysql -uroot -p -A
> PW: my-secret-pw 

select user,host from mysql.user;
 
Make sure root is a modulo instead of localhost

mysql -uroot -p -P3306 -h127.0.0.1
CREATE DATABASE metagenre;
show databases;

CREATE USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'root';

FLUSH PRIVILEGES;


### Acknowledgments & Guides
* FontAwesome and FlatIcon icons 
* SVG CSS filter generator to convert from black to target hex color: https://codepen.io/sosuke/pen/Pjoqqp
* Tree HTML/CSS is a modification of Mestika's css3 flowchart / navigation diagram (CodePen)
* Tree Guide: https://lendmeyourear.net/posts/css-only-flowcharts/
* CSS Grid Guide: https://learncssgrid.com/