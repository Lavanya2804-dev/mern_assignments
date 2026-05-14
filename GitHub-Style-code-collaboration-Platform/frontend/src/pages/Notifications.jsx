import {
  useEffect,
  useState,
} from "react";

import MainLayout from "../layouts/MainLayout";

import socket from "../services/socket";

import {
  getNotifications,
} from "../services/notificationService";

function Notifications() {

  const [notifications, setNotifications] =
    useState([]);

  useEffect(() => {

    // FETCH OLD NOTIFICATIONS

    const fetchNotifications =
      async () => {

        try {

          const data =
            await getNotifications();

          setNotifications(data);

        } catch (err) {

          console.log(err);

        }
      };

    fetchNotifications();

    // SOCKET CONNECT

    socket.on("connect", () => {

      console.log(
        "FRONTEND CONNECTED:",
        socket.id
      );

    });

    // NEW PR

    socket.on("newPR", (data) => {

      console.log(
        "NEW PR RECEIVED",
        data
      );

      setNotifications((prev) => [
        {
          message: data.message,
        },
        ...prev,
      ]);

    });

    // NEW ISSUE

    socket.on("newIssue", (data) => {

      console.log(
        "NEW ISSUE RECEIVED",
        data
      );

      setNotifications((prev) => [
        {
          message: data.message,
        },
        ...prev,
      ]);

    });

    // PR MERGED

    socket.on("prMerged", (data) => {

      console.log(
        "PR MERGED RECEIVED",
        data
      );

      setNotifications((prev) => [
        {
          message: data.message,
        },
        ...prev,
      ]);

    });
    
socket.on(
  "newComment",
  (data) => {

    console.log(
      "NEW COMMENT",
      data
    );

    setNotifications(
      (prev) => [
        {
          message:
            data.message,
        },
        ...prev,
      ]
    );

  }
);

    return () => {

      socket.off("connect");
      socket.off("newPR");
      socket.off("newIssue");
      socket.off("prMerged");
      socket.off("newComment");

    };

  }, []);

  return (
    <MainLayout>

      <div className="bg-gray-800 p-6 rounded-lg">

        <h1 className="text-3xl font-bold mb-6 text-white">
          Notifications
        </h1>

        {
          notifications.length === 0 ? (

            <p className="text-gray-400">
              No notifications yet
            </p>

          ) : (

            <div className="space-y-4">

              {
                notifications.map(
                  (note, index) => (

                    <div
                      key={index}
                      className="bg-gray-700 p-4 rounded text-white"
                    >
                      {note.message}
                    </div>

                  )
                )
              }

            </div>

          )
        }

      </div>

    </MainLayout>
  );
}

export default Notifications;