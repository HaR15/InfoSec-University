# SQL Injections

__Background__ <br />
SQL stands for Structured Query Language. It is a type of language which allows you to access and manipulate databases and is the standard in modern programming however there are different versions of it being used today. An SQL Injection occurs when executable SQL is entered into an input field and executed. At worst, the injected SQL can retrieve, view, overwrite and delete the contents of the database. Using SQL Injection can be used for performing an initial probe of a database, to viewing or modifying the databases contents, up to even gaining remote shell access to the database server! 

Consider an application where we have a login screen with inputs for username and password. A vulnerable query can be constructed as follows:

SELECT * FROM USERS WHERE USERNAME = $USERNAME AND PASSWORD = $PASSWORD

Where $USERNAME is the value provided from the user in the username field and $PASSWORD is the value provided from the user in the password field. This can be exploited if the user provides SQL code in the username field. 

For example, if the user provides: username = ' OR 1=1; -- 

Then, the query becomes: SELECT * FROM USERS WHERE USERNAME = '' OR 1=1; --' AND PASSWORD = '';

Since the -- is used for commenting in SQL, the part of the query after that will not be executed. As a result, this is the actually query that will be ran: SELECT * FROM USERS WHERE USERNAME = '' OR 1=1;

This will return a record that either matches an empty username or 1=1, which is always true, and will thus return every row in the database. This is a problem, as if our application logic is to only let a user log in if we can get a record in the USER table where the username and password exist, then SQL injection will let us skip past this check by always returning results. 

With this technique, we can perform probing of the database for information about the database itself by instead usernames such as:

SELECT version() 
SELECT current_database()
SELECT user;
SELECT current_user;
SELECT getpgusername();

Providing us vital information that can be used to craft exploits for specific database versions or users of the database. 



<h2>Overview</h2>

<h3>Error Based</h3>

Using an error-based SQL injection forces the database to generate an error, giving the attacker information upon which to refine their injection.

This method only works when the application doesn't handle errors properly by showing it on the screen to the user. By showing database errors to the user, a malicious user can use this data to determine the structure of the database and what functionality they can get access to (modifying tables, viewing DBMS configurations, etc).

Just using a single quote can even let us know if the application is vulnerable to SQL injection, resulting in an error message like so:

	SQL Injection: '

	Warning: pg_prepare() [function.pg-prepare]: Query failed: ERROR: unterminated quoted string at or near "''' AND passwd=''" LINE 1: ...ame, lastName, passwd FROM account WHERE username=''' AND pa... ^


We can also try to cast string as numeric, which will throw an error but the evaluated string with the current database name will part of the error message. As a result, the malicious user can use this to get further information about the database.

	SQL Injection: '||cast((chr(95)||current_database()) as numeric)||'


<h3>Time Delay</h3>

This method is a type of "Blind Query". Blind querying is different from SQL injections such as Error based injection, since the user can't see errors from the database. However, just because errors or other such information isn't being returned, doesn't mean the application is not vulnerable to SQL injection! This type of query is especially useful to know if the application is SQL injectable or not. In this SQL injection type, we can use database commands (ex. sleep) to delay answers in conditional queries. If the query takes some time to complete, we will then know if it executed our SQL injection, and therefore if the application is SQL injectable. 

Example: SELECT IF(version()=5.3, sleep(5), 'false'); --

Using this SQL injection, an attacker sends a bunch of true-false statements with a sleep function running on a true or false case to gain information. This attack is trickier to use since we are essentially going through this blind so it will require trial and error, trying continuously with new values until we get the behaviour we are looking for. Automated tools, like SQLMAP, are useful in this case as it can automate such tasks. 

<h3>Stacked Queries</h3>
<ol>
	<li>Execute SQL Injection that will execute a series of queries.</li>
</ol>
<h3>Boolean Based</h3>
<ol>
	<li>Execute SQL Injection that will use booleans to determine structure of database.</li>
</ol>
<h3>Union Based</h3>
<ol>
	<li>Execute SQL Injection that will use SQL UNIONS to determine structure of database.</li>
</ol>















__Offensive Steps__
<ol>
<li>Find a target, the website.</li>
<li>Find SQL injection vulnarable input field</li>
<li>Retrieve list of databases (via SQL injection)</li>
<li>Get creative (see what else you can do, find out easter eggs!)</li>
</ol>

__Defensive Steps__
<ol>
<li>Find SQL injection vulnarable input field</li>
<li>Fix vulnurability by modifying source files (download and upload)</li>
<li>Verify fix by attempting to execute none malicious SQL.</li>
</ol>

<h2>Offense</h2>
<i>Explain how to accomplish offensive steps</i>

<h2>Defense</h2>
<i>Explain how to accomplish defensive steps</i>

<h2>FUN FACTS</h2>
In a 2012 study, security company Imperva observed that the average web application received 4 attack campaigns per month, and retailers received twice as many attacks as other industries.
<br />
etc...

<h2>Dev notes</h2>
Overview items should be clickable, when clicked the user is taken to a more indepth explanation of the task and exactly how to do it <i>(not for this document but in the final product)</i>
