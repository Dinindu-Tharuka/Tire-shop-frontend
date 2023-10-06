import { Button, HStack, Input, Text } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import userProfileService, {
  UserProfile,
} from "../../../services/User/user-profile-service";
import UserMeContext from "../../../Contexts/User/UserMe";
import UserProfileContext from "../../../Contexts/User/UserProfileContext";

interface Props {
  onClose: () => void;
}

const UserProfileUpdateForm = ({ onClose }: Props) => {
  // updated status
  const [success, setSucces] = useState("");
  const [error, setError] = useState("");

  const { handleSubmit, register } = useForm<UserProfile>();
  const userMe = useContext(UserMeContext);
  const { userProfiles, setUsersProfiles } = useContext(UserProfileContext);
  const currentUserProfile = userProfiles.find(
    (user) => user.user_account_id === userMe.id
  );

  const onUpdate = (data: UserProfile) => {
    if (currentUserProfile?.id !== undefined){
      const newly = {
        ...data,
        user_account_id: userMe.id,
        id: currentUserProfile?.id,
      };
      userProfileService
        .update(newly, `${currentUserProfile?.id}`)
        .then((res) => {
          setSucces("Updated Successfully...")
          setUsersProfiles(userProfiles.map( profle => profle.id === res.data.id ? res.data: profle))
      })
        .catch((err) => setError("Updated not Sucessfull."));

    }else{
      const newly = {
        ...data,
        user_account_id: userMe.id
      };
      console.log(newly)
      userProfileService
        .create(newly)
        .then(res => {
          setSucces("Updated Successfully...")
          setUsersProfiles([...userProfiles, res.data])
        })
        .catch((err) => setError("Updated not Sucessfull."));

    }
  };
  return (
    <>
      {success && <Text textColor="gray.600">{success}</Text>}
      {error && <Text textColor="red.600">{error}</Text>}
      <form onSubmit={handleSubmit(onUpdate)}>
        <Input
          placeholder="First Name"
          margin={3}
          {...register("first_name")}
          defaultValue={currentUserProfile?.first_name}
        />
        <Input
          placeholder="Last Name"
          margin={3}
          {...register("last_name")}
          defaultValue={currentUserProfile?.last_name}
        />

        <HStack marginTop={5}>
          <Button variant="ghost" type="submit" onClick={()=>{ 
            setError('')
            setSucces('')
          }}>
            Update
          </Button>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </HStack>
      </form>
    </>
  );
};

export default UserProfileUpdateForm;
