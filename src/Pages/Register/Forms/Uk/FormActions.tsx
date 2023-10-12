import React from 'react'
import Button from '../../../../Components/Button'

interface Props {
  page: number;
  havePartners: boolean;
  setPage: any;
}

function FormActions({ page, havePartners, setPage }: Props) {
  return (
    <div className="form-actions">
    {(page > 0) && (page < 3) && (
      <Button onClick={() => setPage(page - 1)} type="button" style="secondary">
        Back
      </Button>
    )}
    {!(page === 2 && !havePartners) && page !== 4 && (
      <Button type="submit" style="primary">
        Next
      </Button>
    )}
  </div>
  )
}

export default FormActions