import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Skeleton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchTrending } from "../services/api";
import Card from "../components/Card";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeWindow, setTimeWindow] = useState("day");
  useEffect(() => {
    setLoading(true);
    fetchTrending(timeWindow)
      .then((res) => setData(res))
      .catch((err) => console.log(err, "err"))
      .finally(() => setLoading(false));
  }, [timeWindow]);
  return (
    <Container maxW={"container.xl"}>
      <Flex my={10} alignItems={"baseline"} gap={4}>
        <Heading as="h2" fontSize={"lg"} textTransform={"uppercase"}>
          Trending
        </Heading>
        <Flex
          alignItems={"center"}
          gap={2}
          border={"1px solid teal"}
          borderRadius={"20px"}
        >
          <Box
            as="button"
            px={4}
            py={1}
            borderRadius={"20px"}
            onClick={() => setTimeWindow("day")}
            bg={timeWindow === "day" ? "gray.900" : ""}
          >
            Today
          </Box>
          <Box
            as="button"
            px={4}
            py={1}
            borderRadius={"20px"}
            onClick={() => setTimeWindow("week")}
            bg={timeWindow === "week" ? "gray.900" : ""}
          >
            This Week
          </Box>
        </Flex>
      </Flex>

      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2,1fr)",
          md: "repeat(4,1fr)",
          lg: "repeat(5,1fr)",
        }}
        gap={6}
        mt={5}
      >
        {data &&
          data.map((item, i) =>
            loading ? (
              <Skeleton height={300} key={i} />
            ) : (
              <Card
                key={item.id}
                item={item}
                setTimeWindow={setTimeWindow}
                type={item?.media_type}
              />
            )
          )}
      </Grid>
    </Container>
  );
};

export default Home;
