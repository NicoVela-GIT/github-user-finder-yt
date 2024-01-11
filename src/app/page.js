"use client"; {/* to use chakraui */}
import { Button, Container, Text } from "@/app/chakra";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import { useState } from "react";
import UserProfile from "./components/UserProfile";

export default function Home() {
	const [userData, setUserData] = useState(null);
	const [loading, setLoading] = useState(false); {/* initally false. Once the search button is clicked it becomes true */}
	console.log(userData);
	return (
		<Container maxW='container.lg'>
			<Navbar />
			<Text fontSize={"3xl"} textAlign={"center"} my={8}>
				Search Github Users
			</Text>
			<Search setUserData={(res) => setUserData(res)} setLoading={setLoading} /> {/* passes user data inside of the search function */}

			{userData && <UserProfile userData={userData} />} {/* passes or doesnt pass user data onto the page. See component "UserProfile" for style */}
		</Container>
	);
}
