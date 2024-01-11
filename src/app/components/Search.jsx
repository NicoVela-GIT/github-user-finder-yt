"use client";
import { Button, Input, useToast } from "@/app/chakra";
import { useState } from "react";

const Search = ({ setUserData, setLoading }) => {
	const [query, setQuery] = useState("");
	const toast = useToast();

	const handleSubmit = async (e) => { {/* Clicking "search" initiates the handleSubmit, pulling data from the API */}
		e.preventDefault();
		if (!query) return; {/* if no query then it won't be executed */}
		setLoading(true);
		setUserData(null); {/* null initally because we don't have the data yet */}
		try {
			const res = await fetch(`https://api.github.com/users/${query}`); {/* Github data API */}
			const data = await res.json(); {/* fetch data function */}

			if (data.message) { {/* if user is not found display "user not found" and show an error for 3sec that is closable */}
				return toast({
					title: "Error",
					description: data.message === "Not Found" ? "User not found" : data.message,
					status: "error",
					duration: 3000,
					isClosable: true,
				});
			}
			setUserData(data);
			addUserToLocalStorage(data, query); {/* Inital function for search history pulling local browser history */}
		} catch (error) {
			toast({
				title: "Error",
				description: error.message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} finally {
			setLoading(false); {/* removes the loading spinner from the screen to populate the data */}
		}
	};

	const addUserToLocalStorage = (data, username) => {
		const users = JSON.parse(localStorage.getItem("github-users")) || []; {/* Checking to verify the user exists */}
		const userExists = users.find((user) => user.id === username); {/* verify user ID is equal to username */}

		if (userExists) {
			users.splice(users.indexOf(userExists), 1); {/* If user exsits put user at the top of user history */}
		}
		users.unshift({
			id: username,
			avatar_url: data.avatar_url,
			name: data.name,
			url: data.html_url,
		});

		localStorage.setItem("github-users", JSON.stringify(users));
	};

	return (
		<form onSubmit={handleSubmit}>
			<Input
				variant={"outline"}
				placeholder={"Type a username (i.e. NicoVela-GIT)"}
				focusBorderColor='linkedin.500'
				value={query}
				onChange={(e) => setQuery(e.target.value)}
			/>
			<Button size='md' type='submit' colorScheme='linkedin' mt={4} disabled={!query} opacity={!query ? 0.5 : 1}>
				Search
			</Button>
		</form>
	);
};

export default Search;
