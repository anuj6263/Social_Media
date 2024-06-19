import useLoginModal from "@/hooks/useLoginModal"
import { useCallback, useState } from "react";
import Modal from "../Modal";
import Input from "../Input";
import useRegisterModal from "@/hooks/useRegisterModal";
import { signIn } from "next-auth/react";

const LoginModal = ()=>{

    const registerModal = useRegisterModal()
    const loginModal = useLoginModal();
    const [email,setEmail] = useState('');
    const [password,setPassword]= useState('');
    const [isLoading,setisLoading] = useState(false);
    
    const onToggle = useCallback(()=> {
        if(isLoading){
            return;
        }
        loginModal.onClose()
        registerModal.onOpen();
        
    },[isLoading, registerModal, loginModal])

    const onSubmit = useCallback(async() => {
        try{
            setisLoading(true)

            await signIn('credentials',{
                email,
                password
            })

            //auth
            loginModal.onClose();
        }
        catch(error){
            console.log(error)
        }
        finally{
           setisLoading(false)
        }
    }, [loginModal,email,password])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            disabled={isLoading}
            />
            <Input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            disabled={isLoading}
            />
        </div>
    )

    const footerContent = (
        <div className="text-neutral-400 text-center mt-4">
            <p>
                First time using twitter?
                <span onClick={onToggle} className="text-white cursor-pointer hover:underline">
                    Create an account
                </span>
            </p>
        </div>
    )
    
    return(
        <Modal
        disabled={isLoading}
        isOpen={loginModal.isOpen}
        title="Login"
        actionLabel="Sign in"
        onClose={loginModal.onClose}
        onSubmit={onSubmit}
        body={bodyContent}
        footer={footerContent}
        />
    )
}

export default LoginModal