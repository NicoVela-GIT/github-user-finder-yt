"use client";
import { Badge, Button, Flex, Spinner, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Text } from "@/app/chakra";
import { Link } from "@chakra-ui/next-js";

const Repos = ({ reposUrl }) => {
	const toast = useToast(); 
	const [repos, setRepos] = useState([]); 
	const [loading, setLoading] = useState(false); {/* Loading spinner */}
	const [showMore, setShowMore] = useState(false); {/* Show more repos */}

	useEffect(() => { {/* Repo data fetch function */}
		const fetchRepos = async () => {
			try {
				setLoading(true); {/* Set loading to true to show repo loading spinner */}
				const res = await fetch(reposUrl);
				const data = await res.json();
				if (data.message) throw new Error(data.message);
				setRepos(data);
			} catch (error) { {/* If error fetching repo data use the same Toast as used in the search file */}
				toast({
					title: "Error",
					description: error.message,
					status: "error",
					duration: 3000,
					isClosable: true,
				});
			} finally {
				setLoading(false); {/* If sucessful fetch then setloading to false */}
			}
		};

		fetchRepos();
	}, [reposUrl, toast]);

	return (
		<>
			<Text
				textAlign={"center"}
				letterSpacing={1.5}
				fontSize={"3xl"}
				fontWeight={"bold"}
				color={"linkedin.400"}
				mt={4}
			>
				REPOSITORIES
			</Text>
			{loading && (
				<Flex justifyContent={"center"}>
					<Spinner size={"xl"} my={4} />
				</Flex>
			)}

			{/* Sort stars in decending order */}
			{repos 
				.sort((a, b) => b.stargazers_count - a.stargazers_count) 
				.map((repo, idx) => {
					if (idx > 4 && !showMore) return null;
					return (
						<Flex
							key={repo.id}
							padding={4}
							bg={"whiteAlpha.200"}
							_hover={{ bg: "whiteAlpha.400" }}
							my={4}
							px={10}
							gap={4}
							borderRadius={4}
							transition={"all 0.3s ease"}
							justifyContent={"space-between"}
							alignItems={"center"}
						>
							<Flex flex={1} direction={"column"}> 								{/* Left side flex for repo content */}
								<Link href={repo.html_url} fontSize={"md"} fontWeight={"bold"}>
									{repo.name}
								</Link>
								<Badge
									fontSize={"0.7em"}
									colorScheme={"purple"}
									w={"min-content"}
									textAlign={"center"}
									px={1}
									mt={1}
								>
									Language: {repo.language || "None"}
								</Badge>
							</Flex>

							<Flex flex={1} gap={4} ml={6}> 										{/* Right side flex for repo content */}
								<Badge fontSize={"0.9em"} colorScheme='orange' flex={1} textAlign={"center"}>
									Stars: {repo.stargazers_count}
								</Badge>
								<Badge fontSize={"0.9em"} colorScheme='pink' flex={1} textAlign={"center"}>
									Forks: {repo.forks_count}
								</Badge>
								<Badge fontSize={"0.9em"} colorScheme='cyan' flex={1} textAlign={"center"}> 
									Watchers: {repo.watchers_count}
								</Badge>
							</Flex>
						</Flex>
					);
				})}

				{/* Show more & show less button */}
			{showMore && (
				<Flex justifyContent={"center"} my={4}>
					<Button size='md' colorScheme='linkedin' onClick={() => setShowMore(false)}>
						Show Less
					</Button>
				</Flex>
			)}

			{!showMore && repos.length > 5 && (
				<Flex justifyContent={"center"} my={4}>
					<Button size='md' colorScheme='linkedin' onClick={() => setShowMore(true)}>
						Show More
					</Button>
				</Flex>
			)}
		</>
	);
};

export default Repos;
