import { useState, useEffect } from "react";

import SettingsLayout from "../../../../layouts/SettingsLayout";
import { Profile, PaymentMethods, SavedAddresses, Notifications, Security } from "./index";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("personal");

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [activeTab]);

  return (
    <SettingsLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === "personal" && <Profile />}
      {activeTab === "payment" && <PaymentMethods />}
      {activeTab === "addresses" && <SavedAddresses />}
      {activeTab === "notifications" && <Notifications />}
      {activeTab === "security" && <Security />}
    </SettingsLayout>
  );
};

export default Settings;
