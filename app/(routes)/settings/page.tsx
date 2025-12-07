export default function SettingsPage() {
    return (
        <div className="p-8 space-y-6">
            <h1 className="text-3xl font-bold">Settings</h1>
            <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-card">
                    <h3 className="font-semibold">Profile Settings</h3>
                    <p className="text-sm text-muted-foreground">Manage your account details and preferences.</p>
                </div>
                <div className="p-4 border rounded-lg bg-card">
                     <h3 className="font-semibold">Notifications</h3>
                    <p className="text-sm text-muted-foreground">Configure how you want to be alerted.</p>
                </div>
            </div>
        </div>
    );
}
