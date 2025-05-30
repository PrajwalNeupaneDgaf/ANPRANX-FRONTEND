import React, { useState } from "react";
import { IoArrowForward } from "react-icons/io5";
import SettingOverDisplay from "./SettingOverDisplay";
import { useUser } from "../Context/UserContext";
import toast from "react-hot-toast";
import instance from "../axios";
import { useNavigate } from "react-router-dom";

const MenuOptions = () => {
  const { User ,setUser} = useUser();

  const [ShowManagePassword, SetShowManagePassword] = useState(false);
  const [ShowManageGeneral, SetShowManageGeneral] = useState(false);
  const [ShowManageEmail, setShowManageEmail] = useState(false);
  const [ShowVerifyCode, setShowVerifyCode] = useState(false);

  const [YourPassword, setYourPassword] = useState("");
  const [NewPassword, setNewPassword] = useState("");

  const [NewName, setNewName] = useState(User?.Name);
  const [Gender, setGender] = useState(User?.Gender ||"Male");

  const [NewEmail, setNewEmail] = useState("");

  const [VerifyCode, setVerifyCode] = useState("");

  const navigate = useNavigate()




  const ChangePassword = ()=>{
    if(!NewPassword || !YourPassword){
      toast.error("Please Fill Properly")
      return
    }
    instance.put('/user/update-password',{Password:YourPassword , NewPassword:NewPassword})
    .then((res)=>{
      toast.success("Password Is Changed")
      setNewPassword('')
      setYourPassword('')
      SetShowManagePassword(false)
    }).
    catch((err)=>{
      console.log(err)
      toast.error(err.response.data.message || "Sorry Password Changed Failed")
    })
  }

  const UpdateGeneralInfo = ()=>{
    if(!NewName || !Gender){
      toast.error("Please Fill Properly")
      return
    }
    instance.put(`/user/update-general`,{Name:NewName,Gender:Gender})
    .then(()=>{
      setUser(p=>({...p,
        Name:NewName,
        Gender:Gender,})
      )
      SetShowManageGeneral(false)
      toast.success('Update User Succesfull')
    })
    .catch((err)=>{
      toast.error(err.response.data.message || "Some Error occured")
    })
  }

  const [EmailAdding, setEmailAdding] = useState(false)

  const AddEmail = ()=>{
    if(!NewEmail){
      return toast.error("Please Fill The Email")
    }
    setEmailAdding(true)
    instance.post('/user/add-email',{Email:NewEmail})
    .then(()=>{
      toast.success("Email Added Succesfully,Verify It")
      setUser(p=>({
        ...p,
        Email:NewEmail,
        IsVerified:false
      }))
      setNewEmail('')
      setShowManageEmail(false)

    }).catch((err)=>{
      toast.error(err.response.data.message || "Some Error Occured")

    })
    .finally(()=>{
      setEmailAdding(false)
    })
  }

  const [CodeSending, setCodeSending] = useState(false)

  const sendCode = ()=>{
    if(CodeSending){
      return toast("Wait...")
    }
    setCodeSending(true)

    instance.get('/user/send-code')
    .then(()=>{
      toast.success("Email Sent Check Email")
    })
    .catch(err=>{
      toast.error(err.response.data.message || "Error occured")
    })
    .finally(()=>{
      setCodeSending(false)
    })
  }


  const [IsSubmiting, setIsSubmiting] = useState(false)

  const  SubmitCode = ()=>{
    if(!VerifyCode){
      return toast.error("Please Provide Code")
    }
    setIsSubmiting(true)

    instance.post('/user/verify-email',{Code:VerifyCode})
    .then(()=>{
      toast.success("Succesfully Verified")
      setVerifyCode('')
      setShowVerifyCode(false)
      setUser(p=>({
        ...p,
        IsVerified:true
      }))
    })
    .catch((err)=>{
      toast.error(err.response.data.message || "Some Error Occured")
    })
    .finally(()=>{
      setIsSubmiting(false)
    })
  }
  const Genders = ["Male", "Female", "Others"];
  return (
    <div>
      {/* Managge Notification  */}
      <div className="border rounded border-solid border-gray-200 px-3 py-7 text-sm md:text-[1em] font-light w-full text-center flex justify-center flex-col gap-5 items-center cursor-pointer my-1 md:my-2">
        <p className="w-full text-center">
          {!User.Email
            ? "Please Add An Email To Change Your Password If You Forgot It And Secure Your ID"
            : User.IsVerified
            ? "Thanks For Email Verification Now You Can Reset Your Password If You Forgot Your Pasword"
            : "  !! Your Email Is Not Verified Verify It For ,Password managing and Many other. Verify to Use it !!"}
        </p>
      </div>

      <div
        onClick={() => {
          SetShowManagePassword(true);
        }}
        className="border group rounded border-solid border-gray-200 px-3 py-2 flex justify-between items-center cursor-pointer my-1 md:my-2"
      >
        <strong className="text-sm md:text-[1.08em] text-gray-800 select-none">
          Manage Passwords
        </strong>
        <div className="invisible group-hover:visible animate-bounce">
          <IoArrowForward size={17} />
        </div>
      </div>
      <div
        onClick={() => {
          SetShowManageGeneral(true);
        }}
        className="border group rounded border-solid border-gray-200 px-3 py-2 flex justify-between items-center cursor-pointer my-1 md:my-2"
      >
        <strong className="text-sm md:text-[1.08em] text-gray-800 select-none">
          Edit General Info
        </strong>
        <div className="invisible group-hover:visible animate-bounce">
          <IoArrowForward size={17} />
        </div>
      </div>
      <div
        onClick={() => {
          setShowManageEmail(true);
        }}
        className="border group rounded border-solid border-gray-200 px-3 py-2 flex justify-between items-center cursor-pointer my-1 md:my-2"
      >
        <strong className="text-sm md:text-[1.08em] text-gray-800 select-none">
          {User.Email ? " Change Your Email" : "Add New Email"}
        </strong>
        <div className="invisible group-hover:visible animate-bounce">
          <IoArrowForward size={17} />
        </div>
      </div>
      <div
        onClick={() => {
          if (User?.Email) {
            setShowVerifyCode(true);
          } else {
            toast.error("Add Your Email First");
          }
        }}
        className="border group rounded border-solid border-gray-200 px-3 py-2 flex justify-between items-center cursor-pointer my-1 md:my-2"
      >
        <strong className="text-sm md:text-[1.08em] text-gray-800 select-none">
          Verify Email
        </strong>
        <div className="invisible group-hover:visible animate-bounce">
          <IoArrowForward size={17} />
        </div>
      </div>
      <div onClick={()=>{
        navigate('/menu/saves')
      }}  className="border group rounded border-solid border-gray-200 px-3 py-2 flex justify-between items-center cursor-pointer my-1 md:my-2">
        <strong className="text-sm md:text-[1.08em] text-gray-800 select-none">
          Saved Post
        </strong>
        <div className="invisible group-hover:visible animate-bounce">
          <IoArrowForward size={17} />
        </div>
      </div>
      <div onClick={()=>{
        navigate('/menu/blocked')
      }} className="border group rounded border-solid border-gray-200 px-3 py-2 flex justify-between items-center cursor-pointer my-1 md:my-2">
        <strong className="text-sm md:text-[1.08em] text-gray-800 select-none">
          Person You Blocked
        </strong>
        <div className="invisible group-hover:visible animate-bounce">
          <IoArrowForward size={17} />
        </div>
      </div>
      <SettingOverDisplay
        Header={"Manage Password"}
        setDisplay={SetShowManagePassword}
        Display={ShowManagePassword}
      >
        <div className="flex flex-col gap-3">
          <div className="flex gap-2 flex-col md:flex-row md:items-center justify-center">
            <label
              htmlFor="YourPassword"
              className="whitespace-nowrap md:font-semibold text-gray-600"
            >
              Your Password:
            </label>
            <input
              value={YourPassword}
              onChange={(e) => {
                setYourPassword(e.target.value);
              }}
              placeholder="Your Password"
              type="password"
              id="YourPassword"
              className="border border-solid border-gray-400 rounded-xl p-2 text-sm outline-none w-full"
            />
          </div>
          <div className="flex gap-2 flex-col md:flex-row md:items-center ">
            <label
              htmlFor="NewPassword"
              className="whitespace-nowrap md:font-semibold text-gray-600 justify-center"
            >
              New Password:
            </label>
            <input
              value={NewPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
              placeholder="New Password"
              type="password"
              id="NewPassword"
              className="border border-solid border-gray-400 rounded-xl p-2 text-sm outline-none w-full"
            />
          </div>
          <button onClick={ChangePassword} className="w-full bg-gradient-to-r from-orange-500 to-orange-700 py-2 rounded-2xl font-semibold text-gray-100 cursor-pointer">
            Submit
          </button>
        </div>
      </SettingOverDisplay>
      <SettingOverDisplay
        Header={"Manage General Info"}
        setDisplay={SetShowManageGeneral}
        Display={ShowManageGeneral}
      >
        <div className="flex flex-col gap-3  ">
          <div className="flex gap-2 flex-col md:flex-row justify-center md:items-center ">
            <label
              htmlFor="YourName"
              className="whitespace-nowrap md:font-semibold text-gray-600"
            >
              Your Name:
            </label>
            <input
              value={NewName}
              onChange={(e) => {
                setNewName(e.target.value);
              }}
              placeholder="Your Name"
              type="text"
              id="YourName"
              className="border border-solid border-gray-400 rounded-xl p-2 text-sm outline-none w-full"
            />
          </div>
          <div className="flex gap-2 flex-row md:flex-row items-center">
            <label className="whitespace-nowrap md:font-semibold text-gray-600 justify-center">
              Your Gender:
            </label>
            <div className="flex justify-center gap-4 items-center ">
              {Genders.map((itm, idx) => {
                return (
                  <button
                    onClick={() => {
                      setGender(itm);
                    }}
                    key={idx}
                    className={`p-2 font-semibold w-12 flex justify-center   cursor-pointer rounded ${
                      itm == Gender ? "bg-orange-600 text-white" : "bg-gray-400"
                    }`}
                  >
                    {itm.slice(0, 1)}
                  </button>
                );
              })}
            </div>
          </div>
          <button onClick={UpdateGeneralInfo} className="w-full bg-gradient-to-r from-orange-500 to-orange-700 py-2 rounded-2xl font-semibold text-gray-100 cursor-pointer">
            Submit
          </button>
        </div>
      </SettingOverDisplay>
      <SettingOverDisplay
        Header={"Change Email"}
        setDisplay={setShowManageEmail}
        Display={ShowManageEmail}
      >
        <div className="flex flex-col gap-3">
          <div className="flex gap-2 flex-col md:flex-row justify-center md:items-center ">
            <label
              htmlFor="yourEmail"
              className="whitespace-nowrap md:font-semibold text-gray-600"
            >
              Your New Email:
            </label>
            <input
              value={NewEmail}
              onChange={(e) => {
                setNewEmail(e.target.value);
              }}
              placeholder="Your New Email"
              type="email"
              id="yourEmail"
              className="border border-solid border-gray-400 rounded-xl p-2 text-sm outline-none w-full"
            />
          </div>
          <button onClick={()=>{
            if(!EmailAdding){
              AddEmail()
            }
          }} className="w-full bg-gradient-to-r from-orange-500 to-orange-700 py-2 rounded-2xl font-semibold text-gray-100 cursor-pointer">
            {
              EmailAdding?"Adding":"Submit"
            }
          </button>
        </div>
      </SettingOverDisplay>
      {/* Verification  */}
      <SettingOverDisplay
        Header={"Verify Email"}
        setDisplay={setShowVerifyCode}
        Display={ShowVerifyCode}
      >
        <div className="flex flex-col gap-3">
          <div className="flex gap-2 flex-col md:flex-row justify-center md:items-center ">
            <label
              htmlFor="YourCode"
              className="whitespace-nowrap md:font-semibold text-gray-600"
            >
              Your Code:
            </label>
            <input
              inputmode="numeric"
              pattern="[0-9]*"
              value={VerifyCode}
              onChange={(e) => {
                setVerifyCode(e.target.value);
              }}
              placeholder="Your Code : xxxxxx"
              type="text"
              id="YourCode"
              className="border border-solid border-gray-400 rounded-xl p-2 text-sm outline-none w-full"
            />
          </div>
          <button onClick={()=>{
            if(!IsSubmiting){
              SubmitCode()
            }
          }} className="w-full bg-gradient-to-r from-orange-500 to-orange-700 py-2 rounded-2xl font-semibold text-gray-100 cursor-pointer">
            {IsSubmiting?"Submiting..":"Submit"}
          </button>
          <button onClick={sendCode} className="w-full bg-gradient-to-r from-gray-800 to-gray-700 py-2 rounded-2xl font-semibold text-gray-100 cursor-pointer">
            {
              CodeSending?"Being Sent...":"Resend Code"
            }
          </button>
        </div>
      </SettingOverDisplay>
    </div>
  );
};

export default MenuOptions;
