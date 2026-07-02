import bcrypt from "bcrypt";

const useGeneratePassword = async password => {
  const salt = await bcrypt.genSalt(10);
  const hashpassword = await bcrypt.hashSync(password, salt);
  return hashpassword;
};

const useComparePassword = async (currentPassword, oldPassword) => {
  const comparePassword = await bcrypt.compare(currentPassword, oldPassword);
  return comparePassword;
};

export { useGeneratePassword, useComparePassword };
