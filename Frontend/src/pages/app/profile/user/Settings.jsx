import { useState, useEffect } from "react";

import SettingsLayout from "../../../../layouts/SettingsLayout";

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
      {/* {activeTab === "personal" && <Profile />} */}
    </SettingsLayout>
  );
};

export default Settings;
