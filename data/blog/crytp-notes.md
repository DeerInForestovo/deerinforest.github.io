---
title: 18631 Information Security | Notes
tags: [LectureNotes]
date: 2026-02-18
---

Notes for CMU-18631 Introduction to Information Security.

## Lecture 1: Intro

Grading:

+ Participation (quizzes) 10%
+ Homework assignments 30%
+ Tests (Test 1, 2, 3) 45%
+ Case study 15% (10+5)

## Lecture 2-3: Threat Model

Goal:
+ Model the system
+ Model the threats

How to threat model? Think about
+ What are you building?
+ What can go wrong?
+ What should you do about things than can go wrong?
+ Did you do a good job of analysis?

How to model the system? Think about
+ Diagrams of the system
    + What are the components?
    + How data flow through the system?
+ Trust boundaries
    + Who control/have access to which components?
+ Attack surface
    + The set of APIs that an attacker can launch an attack against.

Mind set in threat modeling:
+ Focusing on asset
    + How an attacker could threaten each asset?
+ Focusing on attackers
    + What attacker would do?
+ Focusing on software and system
    + Build models that focus on software being built, or system being deployed
    + Detail assumptions made

Boolean attack tree/Parameterized attack tree:
+ Nodes: attack steps
+ Parameters: can be costs, probabilities, etc.

Threat model by Microsoft, STRIDE:
+ Spoofing of user identity
+ Tampering
+ Repudiation
+ Information disclosure (privacy breach or data leak)
+ Denial of service (D.o.S)
+ Elevation of privilege

Security requirements (properties):
+ Secrecy, privacy, and confidentiality
    + Keeping information secret from all but those who are authorized to see it
    + Privacy = preserving own personal information secret
        + Alice protects her privacy by not sharing her address to strangers
    + Confidentiality = obligation to preserve someone else's information secret
        + Trent ensures confidentiality of Alice's credit card numbers
    + Secrecy = effect of mechanisms used to limit the number of principals who can access information
+ Integrity
    + Ensuring that information has not been altered by unauthorized or unknown means
+ Authentication/Identification
    + Corroboration of the identity of an entity
    + Note that identification can be pseudonymous
+ Message Authentication
    + Corroborating the source of information
    + Also known as _data origin authentication_
+ Anonymity
    + Concealing identity of a protocol participant
+ Non-repudiation (Accountability)
    + Assurance that someone cannot deny something
+ Freshness
    + Proof that an event occurred after a given point in time
+ Age
    + Proof that an event occurred before a given point in time
+ Availability
    + Services/resources are available to rightful entities
+ Others
    + Authorization
        + Conveyance to another entity of official sanction to **do** or **be** something (someone)
    + Certification
        + Endorsement of information by a trusted entity
    + Access control
        + Restricting access to resources to privileged entities
    + Witnessing
        + Verifying the creation or existence of information by an entity other than the creator
    + Revocation
        + Retraction of certification or authorization

## Lecture 4: Symmetric Key Cryptography

+ **Cryptology** is the study of Cryptography and Cryptanalysis
+ **Cryptography** is the study of mathematical techniques to enforce security properties
    + Only (one of many) means to an end
+ **Cryptanalysis** is the study of how to break cryptographic systems

Caesar cipher:
+ Shift each letter by a fixed amount (e.g., 3)
+ E.g., "HELLO" → "KHOOR"
+ Fragile to frequency analysis attack
+ How to destroy the structure?
    + Encrypt more than one letter at a time (e.g. Playfair cipher, digraph cipher)
    + Polyalphabetic substitution (e.g. Vigenère cipher):
        + Use different monoalphabetic substitutions as one progresses through the message
        + A set of related monoalphabetic substitution rules is used
        + A key determines which particular rule is chosen for a given transformation
    + Autotext (i.e. Autokey cipher):
        + Use the plaintext itself as part of the key
        + However, it is still vulnerable to frequency analysis attack
+ Idea: Use a key as long as the text and statistically independent

One-time pad:
+ A stream cipher based on XOR
+ Problem:
    + True randomness is hard
    + Impractical for large messages

Rotor machines:
+ Use multi-stage encryption
+ Each stage consists of a rotor, that performs a monoalphabetic substitution
+ Once a key is pressed the rotor shifts by one position
+ So, for one rotor, polyalphabetic substitution of period 26
+ Power is in using multiple rotors
+ Once the first rotor has completed a full revolution, the second rotor advances by one pin, and so forth

Symmetric Key Cryptography:

$$
P=D_k(E_k(P)), K_1=K_2=K, D_k=E_k^{-1}.
$$

Both parties share the same key $K$.

Stream ciphers:
+ Attempt to approximate a one-time pad
+ Advantage: easy to implement in hardware
+ Disadvantage:
    + Key must never be used twice
    + Bit flipping attack: if the attacker flips a bit in the ciphertext, the corresponding bit in the plaintext will also be flipped, even if the attacker does not know the key (breaks integrity).

Block ciphers:
+ Operate on blocks of n bits of plaintext and ciphertext
+ The same plaintext block is encrypted using the same key, and always encrypts to the same ciphertext block
    + Examples: DES, AES, IDEA, ... Most "popular" ciphers

Feistel cipher:
+ A method of constructing a block cipher from a function $f$ and a key $K$.
+ The plaintext is split into two halves, $L_0$ and $R_0$.
+ For each round $i$, the following operations are performed:
    + $L_i = R_{i-1}$
    + $R_i = L_{i-1} \oplus f(R_{i-1}, K_i)$
+ After $n$ rounds, the ciphertext is formed by concatenating $R_n$ and $L_n$.
+ Advantage: the function $f$ does not need to be invertible, which allows for more flexibility in the design of the cipher.

Data Encryption Standard (DES):
+ Block size = 64 bits
+ Key size = 64 bits, but only 56 bits effective (the remaining 8 bits are used for parity checking)

Advanced Encryption Standard (AES):
+ Support block sizes of 128, 192, or 256 bits and key sizes of 128

Electronic Codebook (ECB) mode, UNSAFE:
+ Each block of plaintext is encrypted independently using the same key.
+ Identical plaintext blocks will produce identical ciphertext blocks, which can reveal patterns in the plaintext.

Triple DES:
+ Why not Double DES?
    + Meet in the middle attack only takes $O(2^{56})$ time to break it.

## Lecture 5: Hash-based Algorithms

One-way Hash Functions:
+ One-way-ness: Given $y=H(x)$, can not easily find $x$.
+ Weak collision resistance: Given $x$, can not easily find $x' \neq x$ such that $H(x) = H(x')$.
+ Strong collision resistance: Can not easily find any two distinct inputs $x$ and $x'$ such that $H(x) = H(x')$.
+ Arbitrary input size, fixed output size

Can we do...
+ Data Integrity by sending $(m,H(m))$?
    + No. An attacker can modify $m$ to $m'$, and compute $H(m')$ to replace $H(m)$.
+ Message Authentication by sending $(m,H(m))$?
    + No. An attacker can modify $m$ to $m'$, and compute $H(m')$ to replace $H(m)$.
+ Secrecy by sending $H(m)$?
    + It is secret, but it is not useful for the receiver to recover $m$.

Birthday Paradox:
+ Two same birthday: $p(n) = 1 - e^{-n(n-1)/2N}$
+ Same birthday as me: $q(n) = 1 - (1 - 1/N)^n$
+ To find a collision of a hash function with an output size of $n$ bits, an attacker only needs to compute $O(2^{n/2})$ hashes, which is much less than the $O(2^n)$ hashes needed for a brute-force attack.

One-way Hash Chain:
+ One-way function $F$
+ Random value $r_n$ (keep secret)
+ Construct from $r_n$ to $r_0$ by $r_i = F(r_{i+1})$ for $i=n-1,...,0$.
+ Efficient one-way verification: 
    + Given $r_i$ and $r_j$ with $i<j$, we can verify that $r_i$ is derived from $r_j$ by applying $F$ for $j-i$ times.
+ Usage: one-time password
    + User generate $r_n$ and compute $r_0$ by applying $F$ for $n$ times, and register $r_0$ to the server.
    + Each time the user wants to login, it sends $r_i$ to the server, and the server verifies that $r_i$ is derived from $r_0$ by applying $F$ for $i$ times. After successful verification, the server updates the stored value to $r_i$ for the next login.

MD5:
pending...

MAC:
pending...

## Lecture 6: Asymmetric Key Cryptography & PKI

Key distribution problem:
+ For $n$ participant in the system, $O(n^2)$ keys are needed for pairwise symmetric key encryption.

Diffie-Hellman-Merkle key exchange protocol:
+ Public: a large prime $p$ and a generator $g$
+ Alice chooses a random secret $a$, computes $A=g^a \mod p$, and sends $A$ to Bob.
+ Bob chooses a random secret $b$, computes $B=g^b \mod p$, and sends $B$ to Alice.
+ Alice computes the shared secret key as $K = B^a \mod p$.
+ Bob computes the shared secret key as $K = A^b \mod p$.
+ Both Alice and Bob arrive at the same shared secret key $K = g^{ab} \mod p$.
+ Eve cannot compute $K$ without solving the discrete logarithm problem.
+ But an eve can perform a Man-in-the-Middle attack
    + Eve intercepts $A$ and $B$, and sends her own values $E_A$ and $E_B$ to Alice and Bob, respectively.
    + Alice computes $K_{AE} = E_B^a \mod p$, and Bob computes $K_{BE} = E_A^b \mod p$.
    + Eve can compute both $K_{AE}$ and $K_{BE}$, and can decrypt messages from Alice and Bob, and re-encrypt them to forward to the other party.

Public Key Cryptography (Asymmetric Key Cryptography):
+ Each participant has a pair of keys: a public key and a private key.
+ The private key is kept secret, while the public key is shared with everyone.
+ The public key is used for encryption, and the private key is used for decryption.
+ Allows encryption and authentication.
+ Requirement:
    + Extremely hard to guess the private key from the public key/ciphertext.
    + Easy to compute the ciphertext from the plaintext and the public key, and to compute the plaintext from the ciphertext and the private key.

RSA:
+ Choose two large prime numbers $p$ and $q$
+ Compute $n = pq$ and $\phi(n) = (p-1)(q-1)$
+ Choose an integer $e$ such that $1 < e < \phi(n)$ and $\gcd(e, \phi(n)) = 1$
+ Compute $d$ such that $de \equiv 1 \mod \phi(n)$
+ Public key: $(n, e)$
+ Private key: $(n, d)$
+ Encryption: $C = M^e \mod n$
+ Decryption: $M = C^d \mod n$
+ Security relies on the difficulty of factoring large integers.

Digital Signature:
+ Sign a message with private key, and anyone can verify the signature with the public key.

Secrecy + Integrity + Authentication:
+ $K_A,K_B$ are private keys, and $K_{A'},K_{B'}$ are public keys.
+ Sign and encrypt: $C = E_{K_{B'}}(M \|\| S_{K_{A}}(M))$
+ When Bob receives $C$, he decrypts it with his private key $K_B$ to get $M$ and the signature, and then verifies the signature with Alice's public key $K_{A'}$.

Public Key Infrastructure (PKI):
+ Alice wants to verify that a public key belongs to Bob
    + Otherwise, Eve can impersonate Bob by generating her own key pair and claiming that the public key belongs to Bob, then Eve can decrypt messages intended for Bob and re-encrypt them to forward to Bob, effectively performing a Man-in-the-Middle attack.
+ Certificate Authority (CA):
    + Similar to a trusted third party (TTP)
    + Vouch for the authenticity of public keys
    + Issuers of public-key certificates
+ PKI Trust Model:
    + Delegate CA: CA can delegate its authority to other CAs, which can further delegate to more CAs, forming a hierarchical trust model.
    + Monopoly CA: A single CA is responsible for issuing certificates for all entities in the system.
    + Monopoly + trusted Registration Authority (RA): RA can check and vouch, but only CA can sign.
    + Oligarchy: Multiple trusted anchors, configurable.
    + (Possible...) Consensus-based protocol: notaries vote on the validity of a certificate, and a certificate is considered valid if it receives enough votes.
+ Problem:
    + Too many "trusted" CAs. If any one of them is compromised, the security of the entire system is compromised.
        + Practical solution: pinning
            + Hard Certificate Pinning: Hardcode the exact server certificate into apps
            + CA Pinning: Limited set of authorities, or a particular public key of server

Certificate Revocation:
+ CRL (Certificate Revocation List): A list of revoked certificates published by the CA.
    + Problem: High cost, not real-time...
+ OCSP (Online Certificate Status Protocol): A protocol for checking the revocation status of a certificate in real-time.
    + Problem: Privacy concern, as the OCSP responder can track which websites a user is visiting.
+ General problem:
    + We assume that a certificate is valid until it expires, but in reality, a certificate can be compromised before its expiration date, and there is no efficient way to revoke it.

## Lecture 7: Access Control in Operating Systems

Model:
+ Source-Request-GUARD-Resource
+ Authorization: Determining who is trusted to access the resource

Policy vs Mechanism:
+ Policy: What is allowed and what is not allowed?
+ Mechanism: How to enforce the policy?

Trusted Computing Base (TCB):
+ The set of components that must function properly for the system to be secure
+ As small as possible

Principles for Access Control:
+ Economy of mechanism: Keep the design as simple and small as possible.
+ Fail-safe defaults: Default to no access, and require explicit permission to grant access.
+ Complete mediation: Every access to every resource must be checked for authorization.
+ Open design: The security of the system should not depend on the secrecy of the design or implementation.
+ Separation of privilege: Require multiple conditions to be satisfied for access to be granted.
+ Least privilege: Give each user and process the minimum privileges necessary to perform their tasks.
+ Least common mechanism: Minimize the amount of sharing. Every shared mechanism (e.g., shared variables) represents a potential (untrusted) information path.
+ Psychological acceptability: The access control mechanism should not make the resource more difficult to access than if the security mechanism were not present.

Simple Access Control Policies:
+ Unprotected: e.g. DOS
+ Complete isolation: users are in sandboxes. e.g. virtualization
+ Controlled sharing: control explicitly which users can access which resources. e.g. file permissions in Unix

Access Matrices:
+ A triplet (User, Resource, Access), e.g. (Alice, file, write)
+ Access Control List (ACL): For each resource, list the users and their access rights.
    + E.g. file1: (Alice, read), (Bob, write)
+ Capability List: For each user, list the resources and their access rights.
    + E.g. Alice: (file1, read), (file2, write)

| |ACL|Capability List|
|-|-|-|
|Revocation of access of one object|Easy (one list)|Hard (track down all caps)|
|Revocation of one subject|Not easy (all lists)|Not easy (all caps for that subject)|
|Eventual revocation|Easy (create no more caps)|Hard (track down all caps)|
|Giving access to new subjects|Update relevant objects|Issue new caps (easy)|
|Delegate|Difficult|Easy|
|Enumerating legitimate users|Easy|Hard|
|Enumerating accessible objects|Hard|Easy|

+ Discretionary Access Control
    + The user owning an object decides how other users can access the object
    + Example: UNIX Access Control
+ Mandatory Access Control
    + Each object has a sensitivity level associated with it, and users have clearances for different sensitivity levels
    + Example: Military security clearances
+ Role-based Access Control
    + Access rights are assigned to roles, and users are assigned to roles

Access Control in UNIX:
+ Optimization: group by accessor types

| Accessor | Access to File object X |
|----------|-------------------------|
| owner    | read, write, execute    |
| group    | read, execute           |
| others   | read                    |

+ ACL
    + store rights with the target object to be accessed
    + ACL representation is compressed to 9 bits (r,w,x * 3 accessor types)
    + Primitive version; has been extended...

## Lecture 8: Password and MFA

Authentication: verifying the identity of an entity
+ Something you know (e.g. password, PIN)
+ Something you have (e.g. token, smart card, dongle)
+ Something you are (e.g. fingerprint, face, iris)

Password Storage:
+ Plaintext: Not secure.
+ SHA2(password): vulnerable to rainbow table attack.
+ SHA2(password + salt): secure.
    + Salt is randomly generated, easy to lookup or re-generate.

Password Thread Model:
+ Online attack: Attacker tries to guess the password by interacting with the authentication system.
    + Brute-force attack
    + Dictionary attack: using common words.
    + Password spraying attack: trying a few common passwords against many accounts.
    + Mitigation: limit the number of login attempts, use CAPTCHA, etc.
+ Offline attack: Attacker has access to the password hash and tries to guess the password by computing the hash of guesses and comparing with the stored hash.
    + Rainbow table attack: precompute the hash of common passwords and store them in a table for quick lookup.
    + Smart guessing: using leaked dataset.

## Lecture 9: Multilevel and Information Flow Security

Access Control Models:
+ Bell-LaPadula(BLP): Confidentiality
    + No read up: A subject at a lower security level cannot read an object at a higher security level.
    + No write down: A subject at a higher security level cannot write to an object at a lower security level.
    + Avoid leaking information from high to low.
+ Biba: Integrity
    + No read down: A subject at a higher integrity level cannot read an object at a lower integrity level.
    + No write up: A subject at a lower integrity level cannot write to an object at a higher integrity level.
    + Avoid contaminating high integrity data with low integrity data.

Lattice-based Access Control:
+ Security levels form a lattice structure, where each level can be compared to others based on their position in the lattice.

Covert Channels:
+ Using non-traditional means to communicate information
+ Examples:
    + System status checks : ps, time, netstat, ...
    + File system
        + Write (temporary) files, directories
        + Test presence of files
    + Network
        + Sockets, DNS, HTTP GET, ...
    + Cache, pipelining (Spectre, Meltdown)

## Lecture 10: Software Vulnerabilities

Buffer Overflow:
+ Attacker writes more data to a buffer than it can hold, which can overwrite adjacent memory and potentially allow the attacker to execute arbitrary code.
+ Stack smashing: Attacker typically overwrites the return address on the stack to point to malicious code injected by the attacker.
+ Heap smashing: Attacker overwrites data on the heap.

```cpp
void main(int argc, char **argv) {
    int i;
    char *str = (char *) malloc(sizeof(char)*4);
    char *super_user = (char *)malloc(sizeof(char)*9);
    strcpy(super_user, "superuser");
    if (argc > 1) {
        strcpy(str, argv[1]);
    } else {
        strcpy(str, "xyz");
    }
}
// ./a.out xyz.............egg 
```

Defense:
+ C/C++ $\rightarrow$ Rust
+ Non-executable stack, NX:
    + Mark the stack as non-executable, so even if an attacker can inject code into the stack, they cannot execute it.
+ Array bounds checking:
    + Check the bounds of arrays to prevent buffer overflow.
+ Stack guards/Canaries:
    + Place a random value (canary) on the stack before the return address, and check if it is intact before returning from a function. If the canary is altered, it indicates a buffer overflow attack, and the program can take appropriate action (e.g., terminate).
+ Address Space Layout Randomization (ASLR):
    + Randomize the memory addresses used by a program, making it more difficult for an attacker to predict the location of injected code or important data structures.
+ Control Flow Integrity (CFI):
    + Ensure that the control flow of a program follows a predetermined path, preventing attackers from redirecting execution to malicious code.
    + Forward edge: ```call/jmp```, store the set of legal destinations in the binary and check at runtime.
    + Backward edge: ```ret```, use a duplicated stack to store true return addresses.
    + CFI requirements:
        + UNQ: Each function (equivalent) gets its own unique ID
            + Cannot clash with other opcode
            + Can be tricky in the presence of dynamic loading
        + NWC: Code segment (“text”) must not be writable
            + Otherwise the protection instructions may be overwritten
        + NXD: Data segments must not be executable
            + Otherwise attacker may be able to jump to injected code with correct IDs

## Lecture 11: Trusted Platform Module & Trusted Execution Environment

Trusted Computing Base (TCB):
+ The set of components that must function properly for the system to be secure
+ As small as possible

Improve the trustworthiness of the execution environment
+ Evaluation metric: size of Trusted Computing Base (TCB)
+ Approach 1, Vitural-machine based
    + Advantage:
        + Smaller TCB
        + Isolation between apps
    + Disadvantage:
        + VMM is still large and complex
        + Complex
+ Approach 2, Secure Boot via Certification Chain
    + Each component of the boot process verifies following component to be loaded
    + Advantage:
        + Only approved software can be loaded
    + Disadvantage:
        + Single point of failure
        + No isolation
+ Approach 3, Remote Attestation
    + Attestation tells verifier what code is executing on device
    + Even useful if the codes are run in an untrusted environment

Trusted Computing Group (TCG):
+ Open organization to develop, define, and promote open standards for hardware-enabled trusted computing and security technologies.

Trusted Platform Module (TPM):
+ An isolated hardware chip on the mainboard
+ TPM Non-Volatile Memory:
    + Endorsement Key (EK): A unique RSA key pair generated at manufacturing time, used for attestation and encryption.
    + Manufacturer's Certificate: A certificate issued by the manufacturer that binds the EK to the TPM.
    + Storage Root Key (SRK): A key pair generated by the TPM, used to protect other keys stored in the TPM.
    + OwnerPassword (160 bits)
+ Core functions:
    + Random number generation
    + Key generation and storage
    + Cryptographic operations (e.g., encryption, decryption, signing)
    + Platform integrity measurement (e.g., measuring the boot process)

TCG-Style Attestation:
1. BIOS calls ```TPM_Startup```
2. BIOS measures the next component (e.g., bootloader) and extends the measurement into a PCR in TPM using ```TPM_Extend```
    + $PCR_{new}=Hash(PCR_{old}\|\|Hash(BootLoader))$
3. Continue: Bootloader, OS kernel, apps...

Sealed Storage:
+ ```TPM_seal```: Encrypt data with PCR values into a blob.
+ ```TPM_unseal```: Decrypt blob. Only succeed if the PCR values at the time of unseal is the same as the PCR values in the blob.
+ Ensures that data can only be decrypted by authorized programs.

BitLocker:
+ Volume Master Key (VMK) encryptes disk volume key
+ VMK is sealed under TPM SRK using PCR values
    + If PCR changes (e.g. an attacker physically stole the disk and tries to boot it on another machine), the VMK cannot be unsealed, and the disk cannot be decrypted.
+ System Updates may cause PCR values to change
    + Suspend Bitlocker before update
    + Use recovery key
    + Otherwise, LOSS of DATA

Trusted Execution Environment (TEE):
+ A secure area of the main processor that ensures code and data loaded inside to be protected with respect to confidentiality and integrity.
+ Examples:
    + Intel Software Guard Extensions (SGX)
        + Goal:
            + Enclave: protect the secrecy and integrity of program and data
            + Remote attestation: prove program is running in enclave
        + Applications:
            + Keep secret key in enclave
            + Running client’s program in enclave in the cloud

## Lecture 12: Hardware Issues

RowHammer:
+ RW one row too frequently can cause bit flips in adjacent rows
+ Possible impact:
    + Privilege escalation: bit flip in page table entry can give attacker access to more memory than they should have.
    + Data corruption: bit flip in user data can cause program to crash or behave incorrectly.
+ Mitigation:
    + Error-correcting code (ECC) memory: can detect and correct single-bit errors, but may not be effective against multi-bit errors caused by RowHammer.
    + Targeted Row Refresh (TRR): refresh adjacent rows when a row is accessed frequently, but may not be effective against all RowHammer variants.
    + Limit refresh rate: reduce the refresh rate of DRAM to make it harder for attackers to trigger RowHammer, but may impact performance.

Meltdown:
+ Modern CPUs use speculative execution to improve performance, which can lead to side-channel attacks that leak sensitive information. Example:
    + Instruction A: read a kernel memory to $A$
    + Instruction B: read $Array[A]$
    + CPU:
        + Run A
        + Run B, put $Array[A]$ in cache
        + Check permissions for A, realize that A is not allowed, and roll back A and B
        + However, $Array[A]$ is still in cache, and an attacker can measure the access time to $Array[A]$ to infer the value of $A$.
+ What it breaks? Authorization Boundary.

Spectre:
+ Similar to Meltdown. Train the branch predictor to mispredict a branch, and execute instructions that should not be executed, which can lead to side-channel attacks that leak sensitive information.
+ What it breaks? Logic Boundary.

## Lecture 13: Web Security

The browser is a sandbox.
+ Like a VM running untrusted code (web page) with limited access to the system resources.

Browser Security Policy
+ Goals:
    + Safe to visit an evil website
    + Safe to visit two pages at the same time
    + Allow safe delegation
+ Same Origin Policy (SOP):
    + Origin = (scheme, host, port)
    + A web page can only access resources from the same origin.
    + Limited access to other origins
    + Does it achieve all goals?
        + Safe to visit an evil website: Yes, as long as the evil website does not have vulnerabilities that can be exploited.
        + Safe to visit two pages at the same time: Yes, as long as the two pages are from different origins.
        + Allow safe delegation: No. Risk: ```<script>``` tag can load and execute script from other origins, which can lead to cross-site scripting (XSS) attacks.
            + Use ```<iframe>``` to embed content from other origins, but it has limited access to the parent page, which can mitigate some risks.
+ Content Security Policy (CSP):
    + Network response header
    + Can prevent inline scripts from running
    + Can be used to control where resources are loaded from
        + script-src 'self'
        + script-src ```https[://]trusted-website[dot]com```
    + Can also be used to:
        + Restrict embedding
        + Upgrade requests
        + Require trusted types

Attacker Model (from weak to strong):
+ Web attacker:
    + Controls attacker.com, has certificate for it
    + User visits site (perhaps unknowingly)
+ Network attacker
    + Passive: eavesdrops on packets
    + Active: can modify or inject traffic
+ Malware attacker
    + Can run native code, outside sandboxes, on victim's computer

Cross Site Scripting (XSS):
+ Attacker injects malicious JavaScript into web applications
+ Common types:
    + Reflected XSS (type 2, non-persistent)
        + attack script is reflected back to the user as part of a page from the victim
        site (error message, search result, ...)
    + Stored XSS (type 1, persistent)
        + attacker stores malicious code in a resource managed by the web
        application (database, message forum,...)
    + DOM-based XSS
        + Attackers injects malicious code into a vulnerable script in the browser

Cross-site Request Forgery (CSRF):
+ User login ```bank.com``` in one tab, and visits ```evil.com``` in another tab
+ ```evil.com``` sends a request to ```bank.com``` to transfer money
+ The browser sees the request to ```bank.com``` and includes the user's cookies, so the request is authenticated as if it came from the user, and the money is transferred without the user's consent.
+ CSRF Token:
    + A random token is generated by the server and included in the form as a hidden field.
    + When the form is submitted, the server checks if the token is valid. If it is not valid, the request is rejected.
    + The token is protected by the SOP.

SQL Injection:
+ Attacker injects malicious SQL code into a web application, which can lead to unauthorized access to the database, data leakage, or even complete compromise of the database server.

## Lecture 14: TCP/IP Vulnerabilities

TCP Initial Sequence Number (ISN) Prediction Attack:
+ Mallory can pose as Alice, even though Mallory cannot intercept traffic between Alice and Bob
+ Mitigation:
    + Better random number generator for ISN
    + Sending ```RST``` to close the connection if an unexpected ISN is received
        + However, the attaker can send lots of ```SYN``` to cause denial of service (DoS) attack by exhausting the server's resources.

Tempering Routing Tables:
+ Route all traffic to malicious host

## Lecture 15: Distributed Denial of Service (DDoS) Attack

DoS: Mallory sends Bob a lot of requests, so Bob cannot serve Alice's requests.

Defense DoS:
+ Filter out malicious traffic

DDoS: Mallory controls a botnet of compromised machines (zombies) to send a lot of requests to Bob, so Bob cannot serve Alice's requests.
+ Volumetric/Bandwidth attack: consume all bandwidth of the victim
    + Amplification attack: send a small request to a third-party server with the victim's IP address as the source, and the server will send a large response to the victim, amplifying the attack.
+ Protocol/State-Exhaustion attack: consume all resources of the victim by sending a large number of requests that require the victim to maintain state (e.g., TCP connection, HTTP session).
    + SYN flood: send a large number of SYN packets to the victim, but do not complete the TCP handshake, causing the victim to allocate resources for each half-open connection and eventually exhaust its resources.
+ Application-layer attack: send a large number of requests to a specific application on the victim, causing the application to become unresponsive.

