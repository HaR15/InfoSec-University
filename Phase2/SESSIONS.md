# Sessions

__Background__

Sessions are used to maintain a semi-permanent state between two or more parties. Commonly, sessions are used to maintain a user's state in a web application. For example, a session can be associated with a user of an online store to track their searches, cart's contents, etc. Session data is stored server side while the user's session id is stored by their browser. Manipulating a user's session id or using their session id can result in private data being leaked, malicious actions are executed without a user's consent, and much more.

<b>Session Fixation:</b> Forcing another user to use your provided session id.

<b>Session Hijacking:</b> Getting another user's session and using it without their consent.

__Exercises__

<ol>
	<li>Login to application using another user's session id (which is provided).</li>
	<li>With application using GET/POST parameters for session, execute a command as another user.</li>
	<li>Combine Cross-Site Scripting and Session Fixation to have another user run malicious code.</li>
</ol>