export function addEvent(event)
{
    return {
    type:'ADD_EVENT',
    payload:event
    }
}

export function deleteEvent(Id)
{
    return {
    type:'DELETE_EVENT',
    payload:Id
    }
}

export function updateEvent(event)
{
    return {
        type:'UPDATE_EVENT',
        payload:event
        }

}