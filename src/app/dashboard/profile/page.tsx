import ProfileForm from "@/components/profile/ProfileForm";

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-3xl p-8">
      <h1 className="mb-8 text-4xl font-bold text-center">
        My Profile
      </h1>

      <ProfileForm />
    </div>
  );
}