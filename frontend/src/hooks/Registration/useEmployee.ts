import { useEffect, useState } from "react"
import EmployeeService,{ Employee, EmployeePageStructure } from "../../services/Registration/employee-service"


const useEmployee = () => {
    const [employees, setEmployees] = useState<Employee[]>([])
    const [errorFetchEmployee, setErrorFetchEmployee] = useState('')
    const [nextEmployeeUrl, setNextEmployeeUrl] = useState<string | null>('')
    const [previousEmployeeUrl, setPreviousEmployeeUrl] = useState<string | null>('')
    const [filterEmployeeParams, setFilterEmployeeParams] = useState<string | null>('')
    const [isLoadingEmployees, setIsLoadingEmployees] = useState(false)
    const [employeeCount, setEmployeeCount] =useState(0)


    useEffect(()=>{
        setIsLoadingEmployees(true)
        const {request, cancel} = EmployeeService.getAll<EmployeePageStructure>(filterEmployeeParams)

        request
            .then(res => {
                setEmployees(res.data.results)
                setNextEmployeeUrl(res.data.next)
                setPreviousEmployeeUrl(res.data.previous)
                setIsLoadingEmployees(false)
                setEmployeeCount(res.data.count)
            })
            .catch(error => {
                setErrorFetchEmployee(error.message !== 'canceled'? error.mesage : '')
                setIsLoadingEmployees(false)
            })

            return ()=> cancel();
        }, [filterEmployeeParams])

        return {employees, setEmployees, nextEmployeeUrl, previousEmployeeUrl, filterEmployeeParams, setFilterEmployeeParams, errorFetchEmployee, isLoadingEmployees, employeeCount}
}
  


export default useEmployee