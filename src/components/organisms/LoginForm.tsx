import { useState } from "react";
import { FormGroup } from "@/components/molecules/FormGroup";
import { Input } from "@/components/atoms/Input";
import { PasswordInput } from "@/components/atoms/PasswordInput";
import { RememberForgot } from "@/components/molecules/RememberForgot";
import { FiUser } from "react-icons/fi";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
}

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
          <FormGroup label="Email/Nama Lengkap" htmlFor="email">
        <Input
          type="text"
          name="email"
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
          placeholder="example@gmail.com / ChairulArdana"
          icon={<FiUser className="text-indigo-500" />}
          required
        />
      </FormGroup>

      <FormGroup label="Password" htmlFor="password">
        <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
      </FormGroup>

      <RememberForgot />

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 px-4 rounded-lg hover:from-indigo-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
      >
        Masuk
      </button>
    </form>
  );
};
