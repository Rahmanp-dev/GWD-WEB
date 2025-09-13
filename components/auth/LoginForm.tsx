"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      username,
      password,
    });

    if (result?.error) {
      setError('Invalid credentials');
    } else {
      router.push('/admin/dashboard');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto my-12 p-8 bg-gray-800 rounded-lg">
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-300">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white"
          required
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-300">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white"
          required
        />
      </div>
      <button type="submit" className="w-full py-2.5 text-white bg-blue-600 hover:bg-blue-700 rounded-lg">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
