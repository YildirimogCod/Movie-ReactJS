import {
  Container,
  Flex,
  Grid,
  Heading,
  Input,
  Skeleton,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchSearch } from "../../services/api";
import Card from "../../components/Card";
import PaginationComponent from "../../components/PaginationComponent";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    fetchSearch(searchValue, activePage)
      .then((res) => {
        setData(res?.results);
        setActivePage(res?.page);
        setTotalPages(res?.total_pages);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(setIsLoading(false));
  }, [searchValue, activePage]);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchValue);
  };
  return (
    <Container maxW={"container.xl"}>
      <Flex my={5} alignItems={"baseline"} gap={4}>
        <Heading as="h2" fontSize={"lg"} textTransform={"uppercase"}>
          Search
        </Heading>
      </Flex>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Search movies,tv shows..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </form>{" "}
      {isLoading && (
        <Flex justifyContent={"center"} mt="10">
          <Spinner size={"xl"} color="red" />
        </Flex>
      )}
      {data?.length === 0 && !isLoading && (
        <Heading textAlign={"center"} as="h3" fontSize={"sm"} mt="10">
          No results found
        </Heading>
      )}
      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        gap={"4"}
        mt="6"
      >
        {data?.length > 0 &&
          !isLoading &&
          data?.map((item, i) =>
            isLoading ? (
              <Skeleton height={300} key={i} />
            ) : (
              <Card key={item?.id} item={item} type={item?.media_type} />
            )
          )}
      </Grid>
      {data?.length > 0 && !isLoading && (
        <PaginationComponent
          activePage={activePage}
          totalPages={totalPages}
          setActivePage={setActivePage}
        />
      )}
    </Container>
  );
};

export default Search;
