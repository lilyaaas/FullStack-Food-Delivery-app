import { useState } from "react";
import { User, Phone, Mail, Loader2, Save } from "lucide-react";

import { useAuth } from "../../../../context/AuthContext";
import { InputField } from "../../../../components/index";
import { useSettings } from "../../../../hooks/useSettings";

const ProfileSettings = () => {
  const { user } = useAuth();
  const { updateProfile, isSaving } = useSettings();

  // Form State
  const [formData, setFormData] = useState({
    name: user.name || "",
    phone: user.phone || "",
    email: user.email || "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const onSuccess = (user) => {
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        email: user.email || "",
      });
    };

    // Pass the data and the success callback to the hook
    await updateProfile(formData, onSuccess);
  };

  return (
    <section className="bg-surface-container-lowest rounded-3xl p-4 md:p-8 xl:p-12 shadow-sm overflow-hidden border border-outline-variant/10 min-h-100">
      <div className="animate-in fade-in slide-in-from-right-4 duration-300 mt-6 md:mt-0">
        <header className="flex flex-col items-center justify-center mb-10">
          <h2 className="font-headline text-3xl font-extrabold text-on-background mb-2">
            Personal Information
          </h2>
          <p className="text-on-surface-variant font-medium">
            Update your profile details and how we contact you.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 xl:gap-12 xl:px-10"
        >
          <InputField
            icon={User}
            label="New Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="John Doe"
            type="text"
          />

          <InputField
            icon={Phone}
            label="New Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="06 12345678"
            type="tel"
          />

          <div className="lg:col-span-2">
            <InputField
              icon={Mail}
              label="New Email Address"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="example@abc.def"
              type="email"
            />
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className={`bg-linear-to-br from-primary to-primary-container text-on-primary font-headline font-bold py-3 mt-6 mb-3 xl:mt-0 rounded-full flex items-center justify-center gap-2 disabled:opacity-70 w-1/2 lg:w-auto xl:w-2/3 ${isSaving ? "cursor-not-allowed" : "cursor-pointer active:scale-96 shadow-lg shadow-primary/20 transition-all"}`}
          >
            {isSaving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Saving .....
              </>
            ) : (
              <>
                <Save className="w-5 h-5" /> Save Changes
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ProfileSettings;
