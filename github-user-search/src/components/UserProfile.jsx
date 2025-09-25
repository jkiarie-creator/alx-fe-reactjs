// Placeholder UserProfile component
function UserProfile({ user, searchResults, totalCount }) {
  return (
    <div className="user-profile">
      <h3>User Profile Component</h3>
      <p>This component will display user information for: {user?.login}</p>
      <p>Total search results: {totalCount}</p>
    </div>
  );
}

export default UserProfile;
