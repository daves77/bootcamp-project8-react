/* react imports */
import { useContext } from "react";
import Page from "../components/Page";
import { Context } from "../store";
import { useForm } from "react-hook-form";
/* mui imports */
import {
  Container,
  Grid,
  Typography,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
/* web3 imports */
import { ethers } from "ethers";
import { pinFile } from "../utils/pinata";
import { listToken, makeToken } from "../utils/contractInterface";

export default function Create() {
  const { store } = useContext(Context);
  const { nftContract, mktContract } = store;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    /* want to consider verifying inputs? */
		const metadata = {
      name: data.name,
      description: data.description,
    };
    const ipfsHash = await pinFile(data.image[0], metadata);
    const tokenId = await makeToken(nftContract, ipfsHash);
    const price = ethers.utils.parseUnits(data.price, "ether");
    await listToken(mktContract, nftContract, tokenId, price);
    console.log(ipfsHash);
  };

  return (
    <Page title="Closed Land | Create">
      <Container>
        <Typography variant="h2" sx={{ ml: -1 }}>
          Create New NFT 🛠
        </Typography>
        <Typography variant="subtitle2">
          Personalize and upload your very own NFT collection!
        </Typography>

        <Grid container spacing={3} sx={{ mt: 4, pl: 3 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid item xs={12}>
              <Typography variant="h4" sx={{ mb: 2 }}>
                Upload your masterpiece
              </Typography>
              <input {...register("image")} type="file" />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2, mb: 2 }}>
              <TextField
                variant="outlined"
                label="Name"
                {...register("name")}
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2, mb: 2 }}>
              <TextField
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">ETH</InputAdornment>
                  ),
                }}
                label="Price"
                {...register("price")}
              />
            </Grid>

            <Grid item xs={12} sx={{ mt: 2, mb: 2 }}>
              <TextField
                variant="outlined"
                multiline
                label="Description"
                placeholder="test"
                minRows={4}
                {...register("description")}
              />
            </Grid>
            <Button variant="contained" type="submit">
              Create
            </Button>
          </form>
        </Grid>
      </Container>
    </Page>
  );
}
