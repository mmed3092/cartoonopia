
import {useState} from "react";
import { BoxWrapper } from "../components/LoginSignup";
import { useAddCharacterMutation } from "../hooks/ContributionHooks";
import LoadingIMG from "../components/LoadingIMG";




function NewCharacter() {
    const [formState, setFormState] = useState({})

    const {mutate, isSuccess, isPending, isError, error } = useAddCharacterMutation()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({ ...formState, [event.target.name]: event.target.value });
        event.preventDefault();
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        mutate(formState)
      };
    

    return (
         <BoxWrapper>
            <>
        <div className ="p-4 min-h-screen  ">
          < h1 className="text-4xl font-bold mb-4 text-black">Add New Character</h1> 
            <form className="space-y-5 md:space-y-5" onSubmit={handleSubmit}  >
                <input
                    type="text"
                    className="bg-blue-50 border-gray-400 text-black rounded-lg block w-full pl-2"
                    placeholder="Name"
                    onChange={handleChange}
                    name ="name" />
                <input
                    type="text"
                    className="bg-blue-50 border-gray-400 text-black rounded-lg block w-full pl-2"
                    placeholder="Subtitle"
                    onChange={handleChange}
                    name ="subtitle"
                />
                <input
                    type="text"
                    className="bg-blue-50 border-gray-400 text-black rounded-lg block w-full pl-2"
                    placeholder="Description"
                    onChange={handleChange}
                    name ="description"
                />
                <input
                    type="text"
                    className="bg-blue-50 border-gray-400 text-black rounded-lg block w-full pl-2"
                    placeholder="Image URL"
                    onChange={handleChange}
                    name ="image_url"
                />
                <input
                    type="number"
                    min={0}
                    max ={100}
                    className="bg-blue-50 border-gray-400 text-black rounded-lg block w-full pl-2"
                    placeholder="Strength"
                    onChange={handleChange}
                    name ="strength"
                />
                <input
                    type="number"
                    min={0}
                    max ={100}
                    className="bg-blue-50 border-gray-400 text-black rounded-lg block w-full pl-2"
                    placeholder="Speed"
                    onChange={handleChange}
                    name ="speed"
                />
                <input
                    type="number" 
                    className="bg-blue-50 border-gray-400 text-black rounded-lg block w-full pl-2"
                    min={0}
                    max ={100}
                    placeholder="Skill"
                    onChange={handleChange}
                    name ="skill"
                />
                <input
                    type="number"
                    className="bg-blue-50 border-gray-400 text-black rounded-lg block w-full pl-2"
                    min={0}
                    max ={100}
                    placeholder="Fear Factor"
                    onChange={handleChange}
                    name ="fear_factor"
                />
                <input
                    type="number"
                    className="bg-blue-50 border-gray-400 text-black rounded-lg block w-full pl-2"
                    min={0}
                    max ={100}
                    placeholder="Power"
                    onChange={handleChange}
                    name ="power"
                />
                <input
                    type="number"
                    className="bg-blue-50 border-gray-400 text-black rounded-lg block w-full pl-2"
                    min={0}
                    max ={100}
                    placeholder="Intelligence"
                    onChange={handleChange}
                    name ="intelligence"
                />
                <input
                    type="number"
                    className="bg-blue-50 border-gray-400 text-black rounded-lg block w-full pl-2"
                    min={0}
                    max ={100}
                    placeholder="Wealth"
                    onChange={handleChange}
                    name ="wealth"
                />
                <button type="submit" className="bg-orange-400 text-white font-bold py-2 px-4 rounded">
                Submit</button>
          </form>
          {isPending && <LoadingIMG className="w-1 h-1"/>}
          {isError && <div className="text-red-500">{error.message}</div>}
          {isSuccess && <div className="text-green-500">Character added successfully</div>}
          </div>
          </>
          </BoxWrapper>
      );
    };

export default NewCharacter
