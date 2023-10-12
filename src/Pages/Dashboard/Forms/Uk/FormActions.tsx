import React, { useEffect } from "react";
import Button from "../../../../Components/Button";

interface Props {
  page: number;
  havePartners: boolean;
  setPage: any;
  dashboardCreation?: boolean;
  handleSubmit?: any
}

function FormActions({
  page,
  havePartners,
  setPage,
  dashboardCreation = false,
  handleSubmit,
}: Props) {
  useEffect(() => {
    if (dashboardCreation && page === 2 && !havePartners) {
      handleSubmit();
    }
  }, []);

  return dashboardCreation ? (
    <div className="form-actions">
      {page > 0 && (
        <Button
          onClick={() => setPage(page - 1)}
          type="button"
          style="secondary"
        >
          Back
        </Button>
      )}
      {(page === 0 || page === 1 || page === 2) && (
        <Button type="submit" style="primary">
          Next
        </Button>
      )}
    </div>
  ) : (
    <div className="form-actions">
      {page > 0 && (
        <Button
          onClick={() => setPage(page - 1)}
          type="button"
          style="secondary"
        >
          Back
        </Button>
      )}
      {!(page === 2 && !havePartners) && page !== 4 && (
        <Button type="submit" style="primary">
          Next
        </Button>
      )}
    </div>
  );
}

export default FormActions;
