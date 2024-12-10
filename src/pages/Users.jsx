import { useNavigate } from "react-router-dom";
import AuthenticatedLayout from "../layout/AuthenticatedLayout";
import PropType from "prop-types";
import { useUsersInfo } from "../hooks/useUsersInfo";
import Loading from "../components/Loading";

const Users = () => {
  const navigate = useNavigate();
  const { users, loading, meta, setPage } = useUsersInfo();

  const editUserDetails = (id) => {
    navigate(`/admin/users/${id}/edit`);
  };

  const handleAddUser = () => {
    navigate("/admin/users/add");
  };

  const handlePreviousPage = () => {
    if (meta.current_page > 1) {
      setPage(meta.current_page - 1);
    }
  };

  const handleNextPage = () => {
    if (meta.current_page < meta.last_page) {
      setPage(meta.current_page + 1);
    }
  };

  return (
    <AuthenticatedLayout className={"gap-4 items-start"}>
      <h1 className="font-bold text-3xl">Users</h1>
      <button onClick={handleAddUser} className="button_style">
        Add User
      </button>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full bg-white shadow-md rounded-lg overflow-x-auto border-collapse">
          <table className="table-auto w-full border-collapse">
            <thead className="border-b border-gray-200">
              <tr className="*:py-4">
                <th scope="col" className="text-left ps-6">
                  Email
                </th>
                <th scope="col" className="text-left ps-4">
                  Role
                </th>
                <th scope="col" className="text-right pe-6"></th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  aria-label="View User Details"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      editUserDetails(user.id);
                    }
                  }}
                  key={user.id}
                  className="*:py-4 hover:bg-slate-200  focus:outline-none focus:bg-slate-200 cursor-pointer"
                  onClick={() => editUserDetails(user.id)}
                >
                  <td className="ps-6">{user.email}</td>
                  <td className="ps-4 capitalize">{user.role}</td>
                  <td className="text-right ps-4">
                    <svg
                      className="w-auto h-4 fill-primary-color pe-6"
                      aria-hidden={"true"}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 512"
                    >
                      <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                    </svg>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      <div className="flex items-center justify-center w-full gap-4">
        <button
          onClick={handlePreviousPage}
          disabled={meta.current_page === 1}
          className={`px-3 py-1 rounded ${
            meta.current_page === 1
              ? "bg-gray-200 fill-primary-color text-gray-400"
              : "bg-primary-color fill-white hover:bg-white hover:fill-primary-color cursor-pointer"
          }`}
        >
          <svg
            className="w-auto h-4 rotate-180"
            aria-hidden={"true"}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
          </svg>
        </button>

        <span>
          Page {meta.current_page} of {meta.last_page}
        </span>

        <button
          onClick={handleNextPage}
          disabled={meta.current_page === meta.last_page}
          className={`px-3 py-1 rounded ${
            meta.current_page === meta.last_page
              ? "bg-gray-200 fill-primary-color text-gray-400  "
              : "bg-primary-color fill-white hover:bg-white hover:fill-primary-color cursor-pointer"
          }`}
        >
          <svg
            className="w-auto h-4 rotate--180"
            aria-hidden={"true"}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
          </svg>
        </button>
      </div>
    </AuthenticatedLayout>
  );
};

Users.propTypes = {
  users: PropType.array,
  loading: PropType.bool,
};

export default Users;
