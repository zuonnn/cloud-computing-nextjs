'use client'
import { useState } from 'react';
import jwt from 'jsonwebtoken'; // Sử dụng thư viện jsonwebtoken
import {useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

interface Account {
  username: string;
  password: string;
}

const Home = () => {
  const router = useRouter();
  const [account, setAccount] = useState<Account>({ username: '', password: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccount((prevAccount) => ({ ...prevAccount, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('https://duong211404.onrender.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(account),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        const userRole = data.user.role;

        Cookies.set('access_token', data.access_token, { secure: true, httpOnly: true });
        Cookies.set('refresh_token', data.refresh_token, { secure: true, httpOnly: true });

        if (userRole === 'Admin') {
          router.push('/admin');
        } else if (userRole === 'User') {
          router.push('/user');
        }
      } else {
        console.error('Login failed:', response.statusText);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-center">Login</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    value={account.username}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={account.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary btn-block">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
