# Cryptography

__Background__ <br/>
Cryptography is the study of secure communications while in the presence of others who should not have access to such communications. To model this system, we have the following participants:

<ul>
	<li><b>Alice and Bob</b> are the two parties seeking secure communications.</li>
	<li><b>Eve</b> is an eavesdropper who is able to listen into the secure commuications, but cannot modify the communication.</li>
	<li><b>Mallory</b> is a malicious person who can modify communications as well as add to the communication.</li>
</ul>

There are three main goals for cryptography:
<ol>
	<li><b>Confidentiality:</b> To be able to communicate without Eve or Mallory understanding what is being said. Only Alice and Bob should be able to understand the communication.</li>
	<li><b>Data Integrity:</b> To be able to communicate without Mallory tampering with the message. If Mallory tries to tamper with the message, Alice and Bob should be able to know that the message has been tampered with.</li>
	<li><b>Authentication:</b> To be able to ensure that a message is coming from who it says its from. Alice should be able to confirm that a message from Bob actually came from Bob, and not Mallory (and similarly for Bob).</li>
</ol>

<h2>Hash function properties</h2>

<ol>
	<li><b>Preimage Resistance:</b> Given y, it is computationally difficult to find x such that h(x)=y.</li>
	<li><b>2nd-Preimage Resistance:</b> Given x, it is computationally difficult to find x1 such that h(x)=h(x1).</li>
	<li><b>Collision Resistence:</b> It is computationally difficult to find x0 and x1 such that h(x0)=h(x1).</li>
</ol>


<i>Will cover below summary of cryptosystem, why it can be useful, where each is vulnerable and why (small key space, hash function not resistant, etc)</i>

<h2>Example Cryptosystems</h2>

<h3>Substitution Cipher</h3>
	<b>FURTHER DETAIL TO BE ADDED</b>
<h3>Caesar Ciper</h3>
	<b>FURTHER DETAIL TO BE ADDED</b>
<h3>Block Cipers (ex. DES, CBC)</h3>
	<b>FURTHER DETAIL TO BE ADDED</b>
<h3>Diffie-Hellman Key Exchange</h3>
	<b>FURTHER DETAIL TO BE ADDED</b>


__Exercises__

<ol>
	<li>Break a simple substitution cipher.</li>
	<li>Break a simple caesar cipher.</li>
	<li>Verify the resistances of provided hash functions.</li>
	<li>Work through a Diffie-Hellman Key Exchange and arrive at the expected shared key.</li>
</ol>




