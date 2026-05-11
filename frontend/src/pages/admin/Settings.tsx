import { useState } from 'react';
import { changePassword } from '@/lib/adminApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, AlertCircle, CheckCircle } from 'lucide-react';

export default function Settings() {
  const [form, setForm] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const set = (key: string, value: string) => setForm(f => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      setError('两次输入的新密码不一致');
      return;
    }
    if (form.newPassword.length < 6) {
      setError('新密码至少需要 6 位');
      return;
    }
    setError('');
    setSuccess(false);
    setSaving(true);
    try {
      await changePassword(form.oldPassword, form.newPassword);
      setSuccess(true);
      setForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : '修改失败');
    } finally {
      setSaving(false);
    }
  };

  const username = localStorage.getItem('admin_username') || 'admin';

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-industrial-dark">账号设置</h1>
        <p className="text-secondary mt-1">管理您的账号信息</p>
      </div>

      <Card className="border-none shadow-sm mb-6">
        <CardHeader><CardTitle>账号信息</CardTitle></CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-2xl font-bold text-white">
              {username[0]?.toUpperCase()}
            </div>
            <div>
              <p className="text-xl font-semibold text-industrial-dark">{username}</p>
              <p className="text-secondary">管理员</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm">
        <CardHeader><CardTitle>修改密码</CardTitle></CardHeader>
        <CardContent>
          {error && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg mb-4 text-sm">
              <AlertCircle className="w-4 h-4" /> {error}
            </div>
          )}
          {success && (
            <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg mb-4 text-sm">
              <CheckCircle className="w-4 h-4" /> 密码修改成功！
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>当前密码</Label>
              <Input
                type="password"
                value={form.oldPassword}
                onChange={e => set('oldPassword', e.target.value)}
                placeholder="请输入当前密码"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>新密码</Label>
              <Input
                type="password"
                value={form.newPassword}
                onChange={e => set('newPassword', e.target.value)}
                placeholder="至少 6 位"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>确认新密码</Label>
              <Input
                type="password"
                value={form.confirmPassword}
                onChange={e => set('confirmPassword', e.target.value)}
                placeholder="再次输入新密码"
                required
              />
            </div>
            <Button type="submit" className="bg-primary hover:bg-primary-hover gap-2" disabled={saving}>
              <Save className="w-4 h-4" /> {saving ? '保存中...' : '修改密码'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
