import { useEffect, useState } from "react";
import { useFolders } from "../hooks/useFolders";
import { useFieldArray, useForm } from "react-hook-form";
import AuthenticatedLayout from "../layout/AuthenticatedLayout";
import api from "../api";

const AddUser = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    fetchRootFolders();
  }, []);

  const { rootFolders, fetchRootFolders } = useFolders();
  const {
    watch,
    setError,
    clearErrors,
    reset,
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      isAdmin: "false",
      permissions: [],
    },
  });

  const handleAppendPermission = () => {
    append({ folderId: "", hasAccess: false });
    clearErrors("permissions");
  };

  const isAdmin = watch("isAdmin");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "permissions",
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const isAdminUser = data.isAdmin === "true";

      if (!isAdminUser) {
        if (!data.permissions || data.permissions.length === 0) {
          setError("permissions", {
            type: "manual",
            message: "At least one permission is required for non-admin users",
          });
          return;
        }

        const hasEmptyFolders = data.permissions.some((perm) => !perm.folderId);
        if (hasEmptyFolders) {
          setError("permissions", {
            type: "manual",
            message: "Please select a folder for each permission",
          });
          return;
        }
      }

      const permissions = isAdminUser
        ? rootFolders.map((folder) => ({
            folderId: folder.id,
            hasAccess: true,
          }))
        : data.permissions;

      await api.post("/users", {
        email: data.email,
        role: isAdminUser ? "admin" : "user",
        permissions: permissions,
      });

      alert("User added successfully!");
      reset();
    } catch (error) {
      if (error.response?.status === 422) {
        alert("This email is already registered");
      } else {
        alert("An error occurred while creating the user");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthenticatedLayout>
      <div className="w-full flex justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-[40rem] flex flex-col gap-8 bg-white p-8 rounded-md shadow-md"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="email-input" className="font-medium">
              Email
            </label>
            <input
              id="email-input"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: <span>Invalid email address</span>,
                },
              })}
              name="email"
              type="email"
              className="input_style"
              placeholder="example@example.com"
              aria-describedby="email-error"
            />
            {errors.email && (
              <span id="email-error" className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="admin-select" className="font-medium">
              Admin
            </label>
            <select
              id="admin-select"
              {...register("isAdmin")}
              className="input_style"
              name="isAdmin"
              aria-label="Select admin status"
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>

          <div>
            <label id="permissions-label" className="font-medium">
              Folder Permissions
            </label>

            {isAdmin === "true" ? (
              <p>This user will have acccess to all folders</p>
            ) : (
              <div className="flex flex-col gap-4">
                <table
                  className="table-auto text-left"
                  aria-labelledby="permissions-label"
                >
                  <thead>
                    <tr className="grid grid-cols-4 gap-4 text-primary-color">
                      <th scope="col" className="col-span-2">
                        Folder
                      </th>
                      <th scope="col">Access</th>
                      <th scope="col">Remove</th>
                    </tr>
                  </thead>

                  {fields.map((field, index) => (
                    <tbody key={field.id}>
                      <tr className="grid grid-cols-4 gap-4 mt-4">
                        <td className="col-span-2">
                          <select
                            id={`folder-select-${index}`}
                            {...register(`permissions.${index}.folderId`, {
                              required: "Please select a folder",
                              validate: (value) =>
                                value !== "" || "Please select a folder",
                            })}
                            className="input_style"
                            aria-label={`Select folder for permission ${
                              index + 1
                            }`}
                          >
                            <option value="">Select a Folder</option>
                            {rootFolders.map((folder) => (
                              <option key={folder.id} value={folder.id}>
                                {folder.name}
                              </option>
                            ))}
                          </select>

                          {errors.permissions?.[index]?.folderId && (
                            <span className="text-red-500 text-sm">
                              {errors.permissions[index].folderId.message}
                            </span>
                          )}
                        </td>
                        <td>
                          <input
                            id={`access-checkbox-${index}`}
                            type="checkbox"
                            {...register(`permissions.${index}.hasAccess`, {})}
                            aria-label={`Toggle access for permission ${
                              index + 1
                            }`}
                          />
                        </td>
                        <td>
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            aria-label={`Remove permission ${index + 1}`}
                          >
                            <svg
                              className="w-auto h-4 fill-red-500 hover:fill-red-700"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                              aria-hidden="true"
                            >
                              <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
                {errors.permissions && (
                  <span className="text-red-500 text-sm">
                    {errors.permissions.message}
                  </span>
                )}

                <button
                  type="button"
                  onClick={handleAppendPermission}
                  className="button_style border border-primary-color bg-transparent text-primary-color hover:bg-primary-color hover:text-white"
                >
                  Add Permission
                </button>
              </div>
            )}
          </div>

          <button disabled={isSubmitting} className="button_style mt-4">
            {isSubmitting ? "Adding User..." : "Submit"}
          </button>
        </form>
      </div>
    </AuthenticatedLayout>
  );
};

export default AddUser;
