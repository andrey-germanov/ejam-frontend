"use client"
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, Stack } from "@mui/material";
import { Button, TextField, Container, Typography } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { apiUrl } from './config';
import { cardStyle, pageStyle } from './page.styles';
import "react-toastify/dist/ReactToastify.css";

interface Superhero {
  id: number;
  name: string;
  superpower: string;
  humilityScore: number;
}
type InputData = {
  name: string;
  superpower: string;
  humilityScore: number;
}
export default function SuperheroPage() {
  const [superheroes, setSuperheroes] = useState<Superhero[]>([]);
  const [formData, setFormData] = useState<InputData>({ name: "", superpower: "", humilityScore: 0 });
  
  useEffect(() => {
    fetchSuperheroes();
  }, []);

  const fetchSuperheroes = async () => {
    try {
      const response = await axios.get<Superhero[]>(`${apiUrl}/superheroes`);
      setSuperheroes(response.data);
    } catch (error) {
      console.error("Error fetching superheroes:", error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangeHumilityScore = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: Number(e.target.value) });
  }

  const deleteSuperhero = async (id: number) => {
    try {
      await axios.delete(`${apiUrl}/superheroes/${id}`);
      toast.success("Superhero deleted successfully!");
      fetchSuperheroes();
    } catch (error) {
      toast.error("Failed to delete superhero");
      console.error("Error deleting superhero:", error);
    }
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/superheroes/add`, formData)
        .then(()=>toast.success("Superhero added successfully!"))
        .catch((err)=> {
          err.response.data.message.map((error: string)=> toast.error(error));
        });

      setFormData({ name: "", superpower: "", humilityScore: 0 });
      fetchSuperheroes();
    } catch (error) {
      console.error("Error adding superhero:", error);
    }
  };

  return (
    <Container maxWidth="lg" sx={pageStyle}>
      <ToastContainer />
      <Typography variant="h4" gutterBottom>Humble Superheroes</Typography>
      <form onSubmit={handleSubmit} className={'heroes-form'}>
        <TextField
          name="name"
          label="Name"
          value={formData.name}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          name="superpower" 
          label="Superpower" 
          value={formData.superpower}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          name="humilityScore"
          label="Humility Score (0-10)"
          type="number"
          value={formData.humilityScore}
          onChange={handleChangeHumilityScore}
          required
          fullWidth
          slotProps={{ 
            htmlInput: {
              min: 0, max: 10
            }
          }}
        />
        <Button type="submit" variant="contained" color="primary">Add Superhero</Button>
      </form>
      <Stack flexDirection={'row'} justifyContent={'center'} flexWrap={'wrap'} mt={2} gap={4}>
        {superheroes.map((hero) => (
          <Card key={hero.id} sx={cardStyle}>
            <span className="delete" onClick={() => deleteSuperhero(hero.id)}>delete</span>
            <CardHeader title={hero.name} subheader={`Superpower: ${hero.superpower}`} />
            <CardContent>
              <Typography variant="body2">Humility Score: {hero.humilityScore}</Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}
