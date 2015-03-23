# Cryptography

__Background__

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

<h2>Overview</h2>

<h3>Ciphers</h3>

<b>Tutorials</b>

A cipher is defined over (K, M, C):
K – Set of all possible keys.
M – Set of all possible messages.
C – Set of all possible cipher texts.
The cipher itself is an algorithm for performing encryption or decryption (E,D). It has series of well-defined steps that can be followed as a procedure.
A cipher must follow properties in order to guarantee that using a key the message can be converted to a cipher text. And that using the same key the cipher text can be converted in the initial message.
E : K x M -> C
D: K x C -> M


<b>Exercises</b>
<ol>
	<li>
		<p>For this decryption each letter correspond to another one in the alphabet:
			<ul>A stands for Z</ul>
			<ul>B stands for Y</ul>
			<ul>C stands for X</ul>
			<ul>...</ul>
			
			<ul>An extra help:</ul>
			
			A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
			Z Y X W V U T S R Q P O N M L K J I H G F E D C B A

			<b>Break a simple substitution cipher (using reversed alphabet key):</b> GSRH RH NB HVXIVG NVHHZTV. DVOO WLMV!
		</p>
		<p>
			<b>Solution:</b> THIS IS MY SECRET MESSAGE. WELL DONE! 
		</p>
	</li>
	<li>
		<p>
			<b>Break a simple caesar cipher (using n=5 shift):</b> YMNX NX RD XJHWJY RJXXFLJ. BJQQ ITSJ!
		</p>
		<p>
			<b>Solution:</b> THIS IS MY SECRET MESSAGE. WELL DONE!
		</p>
	</li>
	<li>
		<p>
			<b>Work through a Diffie-Hellman Key Exchange and arrive at the expected shared key:</b>
			You are Bob, you have the following Diffie Hellman key exchance with Alice
			Alice sent me g= 395363377763382207649834920348203840923840239847162
			Alice sent me p= 466952384993218876392554713407521319117239637943224980015676156491
			Alice sent me (g**a)mod p= 300723517808620014583921852703315464587292197119329816057926935640
			I (Bob) choose a secret b= 42342341235455442142142121466790093012930193021
			I (Bob) send Alice (g**b)mod p= 453373118692197897833794313159714643738688171795156840467741471060
			What is the shared secret key?
		</p>
		<p>
			<b>Solution:</b> The shared secret key = (g**a mod p)**b mod p
			= ((300723517808620014583921852703315464587292197119329816057926935640)^(42342341235455442142142121466790093012930193021)) mod 466952384993218876392554713407521319117239637943224980015676156491
			= 273382463564571444987149829741346426100092556618887997082082175105
		</p>
	</li>
</ol>

<h3>Hash Functions</h3>

<b>Exercises</b>
<ol>
	<li>
		<p>
			<b>Verify the resistances of provided hash functions:</b>
			Using a byte XOR hashing function that takes a list of integers and computes the XOR of the binary representation of the integers, what hash function properties does this have?
			<i>For example: byteXOR([200,200]) = 0, byteXOR([100,200]) = 172, byteXOR([100,200,300]) = 384</i>
		</p>
		<p>
			<b>Solution:</b>
			The hash function is not preimage resistant, for example:
			byteXOR([12, 200, 55, 33, 121, 99]) = 200
			byteXOR([200]) = 200
			byteXOR([12, 99, 55, 33, 121, 300]) = 300
			byteXOR([300]) = 300
		<p>
			byteXOR goes through each element in the list and performs byte XOR operations based on the previous byte XORs. If you only have one element in the list, this value won't have another value to perform a byte XOR operation with, resulting in the single element being returned as the hash value. As a result, it's trivial to determine x where byteXOR(x) = y, since byteXOR(x) = y = byteXOR([y]) which implies that x can equal [y].
		</p>
		<p>
			Similarly, the hash function is not collision resistant, for example:
		</p>
		<p>
			byteXOR([12, 200, 55, 33, 121, 99]) = 200
			byteXOR([200, 12, 55, 33, 121, 99]) = 200
			byteXOR([200, 12, 33, 55, 121, 99]) = 200
			byteXOR([12, 99, 55, 33, 121, 200]) = 200
		</p>
		<p>
			Switching the placement of the values in the list will still provide the same hash value since byte XOR operation is symmetric (x XOR y XOR z = x XOR z XOR y). Also, using the same examples as to why the hash function is not preimage resistant, setting x = [y] will cause a collision.
		</p>
		<p>
			Since the hash function is not preimage resistant and not collision resistant, it is not 2nd-preimage resistant as well. To find x1 where h(x) = h(x1), you can simply set x1 = [y] where y = h(x). For example:
		</p>
		<p>
			byteXOR([1, 2, 3, 4, 5]) = 1
		</p>
		<p>
			To get x1 so that byteXOR(x1) = 1, set x1 = [1]:
				byteXOR([1]) = 1
		</p>
	</li>
</ol>

<h3>Password Security</h3>

<b>Exercises</b>
<ol>
	<li>
		<p>
			<b>Provide user with example etc/passwd file (not using shadow file), determine unencrypted password and login using it:</b>
			root:ueqwOCnSGdsuM:993:993::/home/root:/bin/sh
		</p>
		<p>
			<b>Soluton:</b> hello
		</p>
	</li>
	<li>Provide user with example etc/passwd file (that is using shadow file), determine unencrypted password and login using it.</li>
</ol>
