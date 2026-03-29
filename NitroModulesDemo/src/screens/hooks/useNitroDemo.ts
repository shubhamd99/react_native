import { useState, useEffect } from 'react';
import { MathModuleInstance } from '../../modules/MathModule';
import { UserModuleInstance } from '../../modules/UserModule';
import { UserRole, type User } from '../../specs/UserModule.nitro';

export const useNitroDemo = () => {
  const [syncResult, setSyncResult] = useState<number | null>(null);
  const [asyncResult, setAsyncResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [nativeValue, setNativeValue] = useState('');

  const [usersCount, setUsersCount] = useState(0);
  const [lastUser, setLastUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(false);

  useEffect(() => {
    try {
      setNativeValue(MathModuleInstance.getNativeValue());
    } catch (e) {
      console.error(e);
      setNativeValue('Error loading native value');
    }
  }, []);

  const add = () => setSyncResult(MathModuleInstance.add(10, 25));
  const multiply = () => setSyncResult(MathModuleInstance.multiply(12, 8));

  const runAsync = async () => {
    setLoading(true);
    try {
      setAsyncResult(await MathModuleInstance.doAsyncWork());
    } finally {
      setLoading(false);
    }
  };

  const registerUser = () => {
    const newUser: User = {
      id: Math.random().toString(36).substring(2, 9),
      name: `User_${Math.floor(Math.random() * 1000)}`,
      age: 25,
      role: UserRole.USER,
      tags: ['nitro', 'demo'],
    };
    UserModuleInstance.registerUser(newUser);
    setLastUser(UserModuleInstance.getUserById(newUser.id) ?? null);
    setUsersCount(UserModuleInstance.getUsersByRole(UserRole.USER).length);
  };

  const fetchRemoteUser = async () => {
    setIsUserLoading(true);
    try {
      setLastUser(await UserModuleInstance.fetchRemoteUser('remote-123'));
    } finally {
      setIsUserLoading(false);
    }
  };

  const clearUsers = () => {
    UserModuleInstance.clearAll();
    setLastUser(null);
    setUsersCount(0);
  };

  return {
    nativeValue,
    syncResult,
    asyncResult,
    loading,
    usersCount,
    lastUser,
    isUserLoading,
    add,
    multiply,
    runAsync,
    registerUser,
    fetchRemoteUser,
    clearUsers,
  };
};
