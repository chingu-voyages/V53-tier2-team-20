import { Auth } from '@supabase/auth-ui-react';
import { supabase } from '@/lib/supabase/config';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeSupa } from '@supabase/auth-ui-shared';

// function getThemeColor(cssVar: string): string {
//     const value = getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim();
//     return `hsl(${value})`;
// }

function AuthPage() {
    return (
        <div className="flex items-center min-h-screen justify-center bg-gray-50/50">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
                </CardHeader>
                <CardContent>
                    <Auth
                        supabaseClient={supabase}
                        providers={['google']}
                        appearance={{
                            theme: ThemeSupa,
                        }}
                    />
                </CardContent>
            </Card>
        </div>
    );
}

export default AuthPage;
