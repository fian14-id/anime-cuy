const HeaderProfile = ({ title }) => {
  return (
    <header className="flex flex-col items-center justify-center px-2 text-center md:px-6">
      <h1 className="text-xl font-medium capitalize md:text-4xl">
        {title}
      </h1>
    </header>
  );
};

export default HeaderProfile;