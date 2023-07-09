import React from 'react'
import { useParams, useRouter } from 'next/navigation';

interface CellActionProps {
  data: any
}


const CellAction = ({}: CellActionProps) => {
  const params = useParams();
  const router = useRouter();

  return (
    <div>CellAction</div>
  )
}

export default CellAction