import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./components/Home";
import Login from "./components/Login";
import { selectIsLoggedIn } from "./store/slice/authSlice";
import ErrorPage from "./components/ErrorPage";
import UserInfo from "./components/UserInfo";
import GetAllManager from "./components/GetAllManager";
import GetAllEmp from "./components/GetAllEmp";
import GetAllClient from "./components/GetAllClient";
import CreateEmp from "./components/CreateEmp";
import CreateClient from "./components/CreateClient";
import CreateProject from "./components/CreateProject";
import CreateLead from "./components/CreateLead";
import AppLayout from "./layouts/AppLayout";
import { useState } from "react";
import ToDoPage from "./components/ToDoPage";
import GetAllProject from "./components/GetAllProject";
import InfoBoxByID from "./components/common/InfoBoxByID";
import GetAllLead from "./components/GetAllLead";
import CreateTag from "./components/CreateTag";
import CreateTask from "./components/CreateTask";
import GetAllTask from "./components/GetAllTask";
import GetAllSlip from "./components/GetAllSlip";
import CreateSlip from "./components/CreateSlip";
import GetEmpSlip from "./components/GetEmpSlip";
import ManageLeads from "./components/ManageLeads";
import GetAllInvoices from "./components/GetAllInvoices";
import CreateInvoice from "./components/CreateInvoice";
import GetProject from "./components/common/InfoBoxProject";
import InfoBoxClient from "./components/common/InfoBoxClient";
import InfoBoxEmployee from "./components/common/InfoBoxEmployee";
import UpdateClient from "./components/forms/UpdateClient";

function App() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  // const refreshPage = () => {
  //   window.location.reload();
  // };

  const [activeSideabarLink, setActiveSideabarLink] = useState("");

  return (
    <Routes>
      {isLoggedIn ? (
        <>
          <Route
            path="/home"
            element={
              <AppLayout
                activeSideabarLink={"Dashboard"}
                setActiveSideabarLink={setActiveSideabarLink}
              >
                <Home />
              </AppLayout>
            }
          />
          <Route
            path="/UserInfo"
            element={
              <AppLayout
                activeSideabarLink={"UserInfo"}
                setActiveSideabarLink={setActiveSideabarLink}
              >
                <UserInfo />
              </AppLayout>
            }
          />
          <Route
            path="/manageLeads"
            element={
              <AppLayout
                activeSideabarLink={"manageLeads"}
                setActiveSideabarLink={setActiveSideabarLink}
              >
                <ManageLeads />
              </AppLayout>
            }
          />
          <Route
            path="/getAllManager"
            element={
              <AppLayout
                activeSideabarLink={"getAllManager"}
                setActiveSideabarLink={setActiveSideabarLink}
              >
                <GetAllManager />
              </AppLayout>
            }
          />
          <Route
            path="/getAllInvoice"
            element={
              <AppLayout
                activeSideabarLink={"getAllInvoice"}
                setActiveSideabarLink={setActiveSideabarLink}
              >
                <GetAllInvoices />
              </AppLayout>
            }
          />
          <Route
            path="/getAllEmp"
            element={
              <AppLayout
                activeSideabarLink={"getAllEmp"}
                setActiveSideabarLink={setActiveSideabarLink}
              >
                <GetAllEmp />
              </AppLayout>
            }
          />
          <Route
            path="/getAllProject"
            element={
              <AppLayout
                activeSideabarLink={"getAllProject"}
                setActiveSideabarLink={setActiveSideabarLink}
              >
                <GetAllProject />
              </AppLayout>
            }
          />
          <Route
            path="/getAllClient"
            element={
              <AppLayout
                activeSideabarLink={"getAllClient"}
                setActiveSideabarLink={setActiveSideabarLink}
              >
                <GetAllClient />
              </AppLayout>
            }
          />
          <Route
            path="/getAllSlip"
            element={
              <AppLayout
                activeSideabarLink={"getAllSlip"}
                setActiveSideabarLink={setActiveSideabarLink}
              >
                <GetAllSlip />
              </AppLayout>
            }
          />
          <Route
            path="/getAllTodo"
            element={
              <AppLayout
                activeSideabarLink={"getAllTodo"}
                setActiveSideabarLink={setActiveSideabarLink}
              >
                <ToDoPage />
              </AppLayout>
            }
          />
          <Route
            path="/createEmp"
            element={
              <AppLayout
                activeSideabarLink={"CreateEmp"}
                setActiveSideabarLink={setActiveSideabarLink}
              >
                <CreateEmp />
              </AppLayout>
            }
          />
          <Route
            path="/createSlip"
            element={
              <AppLayout
                activeSideabarLink={"CreateSlip"}
                setActiveSideabarLink={setActiveSideabarLink}
              >
                <CreateSlip />
              </AppLayout>
            }
          />
          <Route
            path="/createClient"
            element={
              <AppLayout
                activeSideabarLink={"CreateClient"}
                setActiveSideabarLink={setActiveSideabarLink}
              >
                <CreateClient />
              </AppLayout>
            }
          />
          <Route
            path="/UpdateClient"
            element={
              <AppLayout
                activeSideabarLink={"CreateClient"}
                setActiveSideabarLink={setActiveSideabarLink}
              >
                <UpdateClient></UpdateClient>
              </AppLayout>
            }
          />
          <Route
            path="/createLead"
            element={
              <AppLayout
                activeSideabarLink={"createLead"}
                setActiveSideabarLink={setActiveSideabarLink}
              >
                <CreateLead />
              </AppLayout>
            }
          />
          <Route
            path="/getAllLead"
            element={
              <AppLayout
                activeSideabarLink={"getAllLead"}
                setActiveSideabarLink={setActiveSideabarLink}
              >
                <GetAllLead />
              </AppLayout>
            }
          />
          <Route
            path="/getAllTask"
            element={
              <AppLayout
                activeSideabarLink={"getAllTask"}
                setActiveSideabarLink={setActiveSideabarLink}
              >
                <GetAllTask />
              </AppLayout>
            }
          />
          <Route
            path="/createProject"
            element={
              <AppLayout
                activeSideabarLink={"CreateProject"}
                setActiveSideabarLink={setActiveSideabarLink}
              >
                <CreateProject />
              </AppLayout>
            }
          />
          <Route
            path="/createTag"
            element={
              <AppLayout
                activeSideabarLink={"CreateTag"}
                setActiveSideabarLink={setActiveSideabarLink}
              >
                <CreateTag />
              </AppLayout>
            }
          />
          <Route
            path="/createInvoice"
            element={
              <AppLayout
                activeSideabarLink={"CreateInvoice"}
                setActiveSideabarLink={setActiveSideabarLink}
              >
                <CreateInvoice />
              </AppLayout>
            }
          />
          <Route
            path="/createTask"
            element={
              <AppLayout
                activeSideabarLink={"CreateTask"}
                setActiveSideabarLink={setActiveSideabarLink}
              >
                <CreateTask />
              </AppLayout>
            }
          />
          <Route
            path="/GetEmp"
            element={
              <AppLayout
                activeSideabarLink={""}
                setActiveSideabarLink={setActiveSideabarLink}
              >
                <InfoBoxEmployee></InfoBoxEmployee>
              </AppLayout>
            }
          />
          <Route
            path="/GetEmpSlip"
            element={
              <AppLayout
                activeSideabarLink={""}
                setActiveSideabarLink={setActiveSideabarLink}
              >
                <GetEmpSlip></GetEmpSlip>
              </AppLayout>
            }
          />
          <Route
            path="/GetProject"
            element={
              <AppLayout
                activeSideabarLink={""}
                setActiveSideabarLink={setActiveSideabarLink}
              >
                <GetProject></GetProject>
              </AppLayout>
            }
          />
          <Route
            path="/GetClient"
            element={
              <AppLayout
                activeSideabarLink={""}
                setActiveSideabarLink={setActiveSideabarLink}
              >
                <InfoBoxClient></InfoBoxClient>
              </AppLayout>
            }
          />
          <Route path="/*" element={<Navigate to="/home" />} />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
      <Route path="/login" element={<Login />} />
      <Route path="/error" element={<ErrorPage />} />
    </Routes>
  );
}

export default function WrappedApp() {
  return (
    <ChakraProvider>
      <App />
    </ChakraProvider>
  );
}
