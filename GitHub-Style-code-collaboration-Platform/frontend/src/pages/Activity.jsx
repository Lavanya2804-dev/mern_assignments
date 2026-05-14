import {
  useEffect,
  useState,
} from "react";

import MainLayout
from "../layouts/MainLayout";

import {
  getActivities,
} from "../services/activityService";

function Activity() {

  const [activities,
    setActivities] =
    useState([]);

  useEffect(() => {

    fetchActivities();

  }, []);

  const fetchActivities =
    async () => {

      try {

        const data =
          await getActivities();

        setActivities(
          data
        );

      } catch (err) {

        console.log(err);

      }
    };

  return (
    <MainLayout>

      <div className="bg-gray-800 p-6 rounded-lg">

        <h1 className="text-3xl font-bold mb-6 text-white">
          Activity Feed
        </h1>

        <div className="space-y-4">

          {
            activities.map(
              (activity) => (

                <div
                  key={activity._id}
                  className="bg-gray-700 p-4 rounded"
                >

                  <p className="text-white">

                    <span className="font-bold text-blue-400">
                      {
                        activity.user
                          ?.username
                      }
                    </span>

                    {" "}
                    {
                      activity.action
                    }

                  </p>

                  <p className="text-gray-300 mt-2">
                    {
                      activity.details
                    }
                  </p>

                  <p className="text-gray-500 text-sm mt-2">

                    Repository:
                    {" "}

                    {
                      activity
                        .repository
                        ?.name
                    }

                  </p>

                </div>
              )
            )
          }

        </div>

      </div>

    </MainLayout>
  );
}

export default Activity;