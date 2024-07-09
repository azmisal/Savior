// components/Signup.js
"use client"
import React, { useState } from 'react';
import router from "next/router"
const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const handleSignup = async () => {
        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (response.ok) {
                console.log('Signup successful');
                alert("Successfull Signup");
                router.push("/login");
                
            } else {
                alert("Signup failed")
                console.error('Signup failed');
            }
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    return (
        <div>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button onClick={handleSignup}>Signup</button>
        </div>
    );
};

export default Signup;
