import {useState} from "react";
import * as Toast from "@radix-ui/react-toast";
import "./toast-styles.css";


const AddToCartToastButton = ({handleAddToCartClick, setDisabled, pageColor}: {handleAddToCartClick: (event: React.MouseEvent<HTMLButtonElement>) => void, setDisabled: () => boolean, pageColor: string}) => {
	const [open, setOpen] = useState(false);

	return (
		<Toast.Provider swipeDirection="right">
			<button
				onClick={(event) => {
					handleAddToCartClick(event)
					setOpen(true)
				}}
				disabled={setDisabled()}
				className="addToCartButton"
			>
				add to cart!
			</button>

			<Toast.Root open={open} className="ToastRoot" onOpenChange={setOpen}>
				<Toast.Title className="ToastTitle">Item added!</Toast.Title>
				<Toast.Description asChild>
					This item has been added to your cart.
				</Toast.Description>
			</Toast.Root>
			<Toast.Viewport className="ToastViewport" />
		</Toast.Provider>
	);
};


export default AddToCartToastButton;
