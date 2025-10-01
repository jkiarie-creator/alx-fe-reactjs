function UserProfile() {
  return (
    <div className="user-profile bg-gray-100 md:p-8 sm:p-4 md:max-w-sm max-w-xs mx-auto my-20 rounded-lg shadow-lg">
      <img className= "rounded-full sm:w-24 sm:h-24 md:w-36 md:h-36 mx-auto"
      src="https://via.placeholder.com/150" alt="User" />
      <h1 className="md:text-xl sm:text-lg text-blue-800 my-4">John Doe</h1>
      <p className="text-gray-600 sm:text-sm md:text-base">Developer at Example Co. <br />Loves to write code and explore new technologies.</p>
    </div>
  );
}

export default UserProfile;