
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  fetchUserData,
  fetchUserPremiumTrue,
  fetchUserPremiumFalse,
  fetchUserActiveTrue,
  fetchUserActiveFalse,
} from "../../redux/actions/users";
import { User } from "../../interfaces/state-interface";
import Switch from "react-switch";
import { Link } from "react-router-dom";

const UserComponent = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [onPage] = useState(5);
  const [totalItem, setTotalItem] = useState(0);
  const [itemOnLastPage, setItemOnLastPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setPage(totalPages);
    }
    if (page < 1) {
      setPage(1);
    }

    const itemsOnLastPage = Math.min(onPage, totalItem - (page - 1) * onPage);
    setItemOnLastPage(itemsOnLastPage);

    dispatch(fetchUserData(onPage, page))
      .then((response: any) => {
        const totalItem: number = +response?.totalCount;
        setTotalItem(totalItem);

        // Calculamos totalPages después de obtener la respuesta
        const totalPages: number = Math.ceil(totalItem / onPage);
        setTotalPages(totalPages);

        console.log("Response: ", response);
      })
      .catch((error: any) => console.warn(error));
  }, [page]);

  const users = useAppSelector((state: any) => state.users);
  const error = useAppSelector((state: any) => state.error);
  const [switchState, setSwitchState] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [userActiveSwitches, setUserActiveSwitches] = useState<{
    [key: string]: boolean;
  }>({});

  const handlePagination = (newPage: number) => {
    if (newPage >= 1 && newPage <= Math.ceil(totalItem / onPage)) {
      setPage(newPage);
    }
  };

  const handlePremiumChange = (userId: string) => async (checked: boolean) => {
    try {
      if (checked) {
        await dispatch(fetchUserPremiumTrue(userId));
        console.log("User Premium updated successfully!");
      } else {
        await dispatch(fetchUserPremiumFalse(userId));
        console.log("User Premium false updated successfully!");
      }
      setSwitchState((prevState) => ({
        ...prevState,
        [userId]: checked,
      }));
    } catch (error) {
      console.error("Error updating user Premium:", error);
    }
  };

  const handleActiveChange = (userId: string) => async (checked: boolean) => {
    try {
      if (checked) {
        await dispatch(fetchUserActiveTrue(userId));
        console.log("User Active updated successfully!");
      } else {
        await dispatch(fetchUserActiveFalse(userId));
        console.log("User Active false updated successfully!");
      }

      setUserActiveSwitches((prevState) => ({
        ...prevState,
        [userId]: checked,
      }));
    } catch (error) {
      console.error("Error updating user Active:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-screen-lg p-4">
        {users && users.length > 0 ? (
          <>
            <table className="w-full border-collapse border border-gray-300">
              {/* Encabezado de la tabla */}
              <thead>
                <tr>
                  <th className="p-2 border border-gray-300">Name</th>
                  <th className="p-2 border border-gray-300">Email</th>
                  <th className="p-2 border border-gray-300">Image</th>
                  <th className="p-2 border border-gray-300">Premium</th>
                  <th className="p-2 border border-gray-300">Active</th>
                </tr>
              </thead>
              {/* Cuerpo de la tabla */}
              <tbody>
                {users.map(
                  (user: User, index: number) =>
                    ((page === totalPages &&
                      index >= (totalItem % onPage || onPage)) ||
                      page !== totalPages) && (
                      <tr key={user.id}>
                        <td className="p-2 border border-gray-300">
                          {user.username}
                        </td>
                        <td className="p-2 border border-gray-300">
                          {user.email}
                        </td>
                        <td className="p-2 border border-gray-300">
                          {user.image ? (
                            <img
                              src={user.image}
                              alt={`Image of ${user.username}`}
                              className="h-8 w-8 object-cover rounded-full"
                            />
                          ) : (
                            "No Image"
                          )}
                        </td>
                        <td className="p-2 border border-gray-300">
                          <Switch
                            onChange={handlePremiumChange(user.id)}
                            checked={switchState[user.id] ?? user.premium}
                            onColor="#1DB954"
                            offColor="#ccc"
                          />
                        </td>
                        <td className="p-2 border border-gray-300">
                          <Switch
                            onChange={handleActiveChange(user.id)}
                            checked={
                              userActiveSwitches[user.id] ?? !user.deletedAt
                            }
                            onColor="#1DB954"
                            offColor="#ccc"
                          />
                        </td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
            {/* Información de paginación */}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handlePagination(page - 1)}
                disabled={page === 1}
                className="bg-gray-300 px-3 py-1 rounded-md"
              >
                Previous
              </button>
              <div>
                Page {page} of {totalPages}
              </div>
              <button
                onClick={() => handlePagination(page + 1)}
                disabled={page === totalPages}
                className="bg-gray-300 px-3 py-1 rounded-md"
              >
                Next
              </button>
            </div>
          </>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <div>Loading...</div>
        )}
        <div className="flex items-center justify-center">
          <div className="my-12">
            <Link to="/songs">
              <button className="bg-black text-white p-4 rounded-lg">
                View songs
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserComponent;
