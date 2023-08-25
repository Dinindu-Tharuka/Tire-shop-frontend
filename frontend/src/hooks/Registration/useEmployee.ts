import { useEffect, useState } from "react"
import EmployeeService,{ Employee, EmployeePageStructure } from "../../services/Registration/employee-service"


const useEmployee = () => {
    const [employees, setEmployees] = useState<Employee[]>([])
    const [errorFetchEmployee, setErrorFetchEmployee] = useState('')
    const [nextEmployeeUrl, setNextEmployeeUrl] = useState<string | null>('')
    const [previousEmployeeUrl, setPreviousEmployeeUrl] = useState<string | null>('')
    const [filterEmployeeParams, setFilterEmployeeParams] = useState<string | null>('')

    useEffect(()=>{
        const {request, cancel} = EmployeeService.getAll<EmployeePageStructure>(filterEmployeeParams)

        request
            .then(res => {
                setEmployees(res.data.results)
                setNextEmployeeUrl(res.data.next)
                setPreviousEmployeeUrl(res.data.previous)
            })
            .catch(error => setErrorFetchEmployee(error.message !== 'canceled'? error.mesage : ''))

            return ()=> cancel();
        }, [filterEmployeeParams])

        return {employees, setEmployees, nextEmployeeUrl, previousEmployeeUrl, filterEmployeeParams, setFilterEmployeeParams}
}
  


export default useEmployee