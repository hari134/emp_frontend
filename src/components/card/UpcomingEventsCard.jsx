import { useState, useEffect } from "react";
import { Box, Card, CardBody, Divider, Text, VStack } from "@chakra-ui/react";
import { RxCalendar } from "react-icons/rx";
import axios from "axios";

const UpcomingEventsCard = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE}/api/admin/specialDates`
        );
        setClients(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleClientSelect = (clientId) => {
    setSelectedClient(clientId);
  };

  return (
    <Card>
      <CardBody>
        <div className="">
          <h1 className="text-lg flex gap-2 items-center">
            <RxCalendar size={24} color="#ccc" /> Upcoming Events
          </h1>
          <Divider my={6} />
          {clients.map((client) => (
            <div
              key={client._id}
              onClick={() => handleClientSelect(client._id)}
              className="cursor-pointer"
            >
              <div className="text-blue-600 flex justify-between">
                <span>
                  Client: {client.clientName}
                </span>
                <span>
                  Brand: {client.brandName}
                </span>
              </div>

              {selectedClient === client._id && (
                <VStack align="start" spacing="2">
                  {client.upcomingEvents.map((event, index) => (
                    <Text key={index} fontSize="sm">
                      {event}
                    </Text>
                  ))}
                </VStack>
              )}
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default UpcomingEventsCard;
