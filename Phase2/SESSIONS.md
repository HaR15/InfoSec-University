# Sessions

__Background__

Sessions are used to maintain a semi-permanent state between two or more parties. Commonly, sessions are used to maintain a user's state in a web application. For example, a session can be associated with a user of an online store to track their searches, cart's contents, etc. Session data is stored server side while the user's session id is stored by their browser. Manipulating a user's session id or using their session id can result in private data being leaked, malicious actions are executed without a user's consent, and much more.

<b>Session Fixation:</b> Forcing another user to use your provided session id. This results in the user having a predetermined session id known to the malicious user. 

<b>Session Hijacking:</b> Getting another user's session and using it without their consent. 

<b>Cross-Site Request Forgery:</b> A CSRF attack forces a victim’s browser, with an established session, to send a forged HTTP request, including the victim’s session cookie and any other automatically included authentication information, to a vulnerable web application. This allows the attacker to force the victim’s browser to generate requests the vulnerable application thinks are legitimate requests from the victim.

__Overview__

<h3>Session Fixation</h3>
<ol>
	<li>Login to application using another user's session id (which is provided).</li>
	<li>Combine Cross-Site Scripting and Session Fixation to have another user run malicious code.</li>
</ol>
<h3>Session Hijacking</h3>
<ol>
	<li>With application using GET/POST parameters for session, execute a command as another user.</li>
</ol>
<h3>Cross-Site Request Forgery</h3>
<ol>
	<li>Cross-Site Request Forgery scenario</li>
</ol>