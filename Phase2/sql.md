# SQL Injections

__Background__ <br />
SQL stands for Structured Query Language. It is a type of language which allows you to access and manipulate databases and is the standard in modern programming however there are different versions of it being used today. An SQL Injection occurs when executable SQL is entered into an input field and executed. At worst, the injected SQL can retrieve, view, overwrite and delete the contents of the database.

<i>More background if any</i>

<h2>Overview</h2>

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
