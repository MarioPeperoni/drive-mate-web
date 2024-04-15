const authLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full flex justify-center items-center bg-gradient-to-br from-purple-700 to-purple-900">
      {children}
    </div>
  );
};

export default authLayout;
